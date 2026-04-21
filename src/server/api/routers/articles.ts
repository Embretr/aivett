import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const articlesRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        category: z.enum(["NEWS", "GUIDE", "TUTORIAL", "COMPARISON"]).optional(),
        limit: z.number().min(1).max(50).default(20),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const articles = await ctx.db.article.findMany({
        where: {
          published: true,
          ...(input.category ? { category: input.category } : {}),
        },
        take: input.limit + 1,
        ...(input.cursor ? { cursor: { id: input.cursor }, skip: 1 } : {}),
        orderBy: { publishedAt: "desc" },
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          category: true,
          publishedAt: true,
          author: true,
          readingTime: true,
          ogImage: true,
        },
      })

      let nextCursor: string | undefined
      if (articles.length > input.limit) {
        const next = articles.pop()
        nextCursor = next?.id
      }

      return { articles, nextCursor }
    }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const article = await ctx.db.article.findUnique({
        where: { slug: input.slug, published: true },
      })

      if (!article) throw new TRPCError({ code: "NOT_FOUND", message: "Artikkelen ble ikke funnet" })

      return article
    }),
})
