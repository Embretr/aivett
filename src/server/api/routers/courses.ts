import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc"

export const coursesRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        category: z.enum(["TUTORIAL", "GUIDE", "COMPARISON", "TOOL_REVIEW"]).optional(),
        level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
        free: z.boolean().optional(),
        limit: z.number().min(1).max(50).default(20),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const courses = await ctx.db.course.findMany({
        where: {
          isPublished: true,
          ...(input.category ? { category: input.category } : {}),
          ...(input.level ? { level: input.level } : {}),
          ...(input.free !== undefined ? { isFree: input.free } : {}),
        },
        take: input.limit + 1,
        ...(input.cursor ? { cursor: { id: input.cursor }, skip: 1 } : {}),
        orderBy: { createdAt: "desc" },
        include: {
          modules: {
            include: { lessons: { select: { id: true } } },
          },
        },
      })

      let nextCursor: string | undefined
      if (courses.length > input.limit) {
        const next = courses.pop()
        nextCursor = next?.id
      }

      return { courses, nextCursor }
    }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const course = await ctx.db.course.findUnique({
        where: { slug: input.slug, isPublished: true },
        include: {
          modules: {
            orderBy: { order: "asc" },
            include: {
              lessons: {
                orderBy: { order: "asc" },
                select: {
                  id: true,
                  slug: true,
                  title: true,
                  duration: true,
                  isPreview: true,
                  order: true,
                },
              },
            },
          },
        },
      })

      if (!course) throw new TRPCError({ code: "NOT_FOUND", message: "Kurset ble ikke funnet" })

      return course
    }),

  checkAccess: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ ctx, input }) => {
      const course = await ctx.db.course.findUnique({
        where: { id: input.courseId },
        select: { isFree: true },
      })

      if (course?.isFree) return { hasAccess: true, reason: "free" as const }

      const subscription = await ctx.db.subscription.findUnique({
        where: { userId: ctx.session.user.id },
      })

      if (subscription?.status === "ACTIVE") {
        return { hasAccess: true, reason: "subscription" as const }
      }

      const access = await ctx.db.userCourseAccess.findUnique({
        where: {
          userId_courseId: {
            userId: ctx.session.user.id,
            courseId: input.courseId,
          },
        },
      })

      if (!access) return { hasAccess: false, reason: "no_access" as const }

      if (access.expiresAt && access.expiresAt < new Date()) {
        return { hasAccess: false, reason: "expired" as const }
      }

      return { hasAccess: true, reason: "purchased" as const }
    }),

  lesson: protectedProcedure
    .input(z.object({ courseSlug: z.string(), lessonSlug: z.string() }))
    .query(async ({ ctx, input }) => {
      const course = await ctx.db.course.findUnique({
        where: { slug: input.courseSlug, isPublished: true },
        select: { id: true, isFree: true },
      })

      if (!course) throw new TRPCError({ code: "NOT_FOUND" })

      const lesson = await ctx.db.lesson.findFirst({
        where: {
          slug: input.lessonSlug,
          module: { courseId: course.id },
        },
        include: {
          quizzes: { orderBy: { order: "asc" } },
          tasks: { orderBy: { order: "asc" } },
          module: {
            include: {
              course: {
                include: {
                  modules: {
                    orderBy: { order: "asc" },
                    include: {
                      lessons: {
                        orderBy: { order: "asc" },
                        select: { id: true, slug: true, title: true, isPreview: true },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })

      if (!lesson) throw new TRPCError({ code: "NOT_FOUND" })

      if (!course.isFree && !lesson.isPreview) {
        const subscription = await ctx.db.subscription.findUnique({
          where: { userId: ctx.session.user.id },
        })

        if (subscription?.status !== "ACTIVE") {
          const access = await ctx.db.userCourseAccess.findUnique({
            where: {
              userId_courseId: {
                userId: ctx.session.user.id,
                courseId: course.id,
              },
            },
          })

          if (!access || (access.expiresAt && access.expiresAt < new Date())) {
            throw new TRPCError({ code: "FORBIDDEN", message: "Du har ikke tilgang til dette kurset" })
          }
        }
      }

      return lesson
    }),

  markLessonComplete: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.lessonProgress.upsert({
        where: {
          userId_lessonId: {
            userId: ctx.session.user.id,
            lessonId: input.lessonId,
          },
        },
        create: {
          userId: ctx.session.user.id,
          lessonId: input.lessonId,
        },
        update: {
          completedAt: new Date(),
        },
      })

      return { success: true }
    }),

  progress: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ ctx, input }) => {
      const course = await ctx.db.course.findUnique({
        where: { id: input.courseId },
        include: {
          modules: {
            include: { lessons: { select: { id: true } } },
          },
        },
      })

      if (!course) throw new TRPCError({ code: "NOT_FOUND" })

      const lessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id))
      const completed = await ctx.db.lessonProgress.count({
        where: {
          userId: ctx.session.user.id,
          lessonId: { in: lessonIds },
        },
      })

      return {
        total: lessonIds.length,
        completed,
        percentage: lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0,
      }
    }),

  submitTask: protectedProcedure
    .input(z.object({ taskId: z.string(), content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.taskSubmission.upsert({
        where: {
          taskId_userId: {
            taskId: input.taskId,
            userId: ctx.session.user.id,
          },
        },
        create: {
          taskId: input.taskId,
          userId: ctx.session.user.id,
          content: input.content,
        },
        update: {
          content: input.content,
          completedAt: new Date(),
        },
      })

      return { success: true }
    }),

  myCourses: protectedProcedure.query(async ({ ctx }) => {
    const accesses = await ctx.db.userCourseAccess.findMany({
      where: {
        userId: ctx.session.user.id,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      include: {
        course: {
          include: {
            modules: {
              include: { lessons: { select: { id: true } } },
            },
          },
        },
      },
    })

    const subscription = await ctx.db.subscription.findUnique({
      where: { userId: ctx.session.user.id },
    })

    return { accesses, subscription }
  }),
})
