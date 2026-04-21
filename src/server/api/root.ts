import { createTRPCRouter, createCallerFactory } from "./trpc"
import { coursesRouter } from "./routers/courses"
import { articlesRouter } from "./routers/articles"
import { paymentsRouter } from "./routers/payments"
import { usersRouter } from "./routers/users"

export const appRouter = createTRPCRouter({
  courses: coursesRouter,
  articles: articlesRouter,
  payments: paymentsRouter,
  users: usersRouter,
})

export type AppRouter = typeof appRouter
export const createCaller = createCallerFactory(appRouter)
