export const dynamic = "force-dynamic"

import { notFound, redirect } from "next/navigation"
import { headers } from "next/headers"
import { MDXRemote } from "next-mdx-remote/rsc"
import { auth } from "../../../../../../server/auth"
import { db } from "../../../../../../server/db"
import { SidebarLayout } from "../../../../../../components/courses/sidebar-layout"
import { QuizBlock } from "../../../../../../components/courses/quiz-block"
import { TaskBlock } from "../../../../../../components/courses/task-block"
import { LessonCompleteButton } from "../../../../../../components/courses/lesson-complete-button"
import { buildMetadata } from "../../../../../../lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>
}) {
  const { slug, lessonSlug } = await params
  const lesson = await db.lesson.findFirst({
    where: { slug: lessonSlug, module: { course: { slug } } },
    select: { title: true },
  })
  if (!lesson) return {}
  return buildMetadata({
    title: lesson.title,
    slug: `/kurs/${slug}/leksjoner/${lessonSlug}`,
  })
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>
}) {
  const { slug, lessonSlug } = await params
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) redirect(`/logg-inn?redirect=/kurs/${slug}/leksjoner/${lessonSlug}`)

  const course = await db.course.findUnique({
    where: { slug, isPublished: true },
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
  })

  if (!course) notFound()

  // Check access
  let hasAccess = course.isFree
  if (!hasAccess) {
    const subscription = await db.subscription.findUnique({
      where: { userId: session.user.id },
    })
    if (subscription?.status === "ACTIVE") {
      hasAccess = true
    } else {
      const access = await db.userCourseAccess.findUnique({
        where: {
          userId_courseId: { userId: session.user.id, courseId: course.id },
        },
      })
      hasAccess = !!access && (!access.expiresAt || access.expiresAt > new Date())
    }
  }

  const lesson = await db.lesson.findFirst({
    where: { slug: lessonSlug, module: { courseId: course.id } },
    include: {
      quizzes: { orderBy: { order: "asc" } },
      tasks: { orderBy: { order: "asc" } },
    },
  })

  if (!lesson) notFound()

  if (!lesson.isPreview && !hasAccess) {
    redirect(`/kurs/${slug}`)
  }

  // Progress data
  const [lessonProgress, taskSubmissions] = await Promise.all([
    db.lessonProgress.findMany({
      where: { userId: session.user.id },
      select: { lessonId: true },
    }),
    db.taskSubmission.findMany({
      where: {
        userId: session.user.id,
        taskId: { in: lesson.tasks.map((t) => t.id) },
      },
    }),
  ])

  const completedLessonIds = lessonProgress.map((p) => p.lessonId)
  const isCompleted = completedLessonIds.includes(lesson.id)

  // Find next lesson
  const allLessons = course.modules.flatMap((m) => m.lessons)
  const currentIndex = allLessons.findIndex((l) => l.slug === lessonSlug)
  const nextLesson = allLessons[currentIndex + 1]

  const submissionMap = Object.fromEntries(
    taskSubmissions.map((s) => [s.taskId, s.content])
  )

  return (
    <SidebarLayout
      courseSlug={slug}
      modules={course.modules}
      completedLessonIds={completedLessonIds}
      courseTitle={course.title}
    >
      <article className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
          {lesson.title}
        </h1>

        {lesson.videoUrl && (
          <div className="mt-6 aspect-video rounded-2xl overflow-hidden bg-black">
            <iframe
              src={lesson.videoUrl.replace("watch?v=", "embed/")}
              className="w-full h-full"
              allowFullScreen
              title={lesson.title}
            />
          </div>
        )}

        <div className="prose-aivett prose prose-gray max-w-none mt-8">
          <MDXRemote source={lesson.content} />
        </div>

        {/* Quizzes */}
        {lesson.quizzes.map((quiz) => (
          <QuizBlock
            key={quiz.id}
            quiz={{
              ...quiz,
              options: (typeof quiz.options === "string" ? JSON.parse(quiz.options) : quiz.options) as string[],
            }}
          />
        ))}

        {/* Tasks */}
        {lesson.tasks.map((task) => (
          <TaskBlock
            key={task.id}
            task={task}
            existingSubmission={submissionMap[task.id]}
          />
        ))}

        {/* Complete button */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <LessonCompleteButton
            lessonId={lesson.id}
            isCompleted={isCompleted}
            nextLessonHref={
              nextLesson ? `/kurs/${slug}/leksjoner/${nextLesson.slug}` : undefined
            }
          />
        </div>
      </article>
    </SidebarLayout>
  )
}
