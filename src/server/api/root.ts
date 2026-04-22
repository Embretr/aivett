import { createTRPCRouter, createCallerFactory } from "./trpc"
import { coursesRouter } from "./routers/courses"
import { articlesRouter } from "./routers/articles"
import { paymentsRouter } from "./routers/payments"
import { usersRouter } from "./routers/users"
import { contactRouter } from "./routers/contact"

export const appRouter = createTRPCRouter({
  courses: coursesRouter,
  articles: articlesRouter,
  payments: paymentsRouter,
  users: usersRouter,
  contact: contactRouter,
})

export type AppRouter = typeof appRouter
export const createCaller = createCallerFactory(appRouter)
