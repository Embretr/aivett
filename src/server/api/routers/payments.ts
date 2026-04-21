import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { stripe } from "../../../lib/stripe"
import { env } from "../../../../env"

export const paymentsRouter = createTRPCRouter({
  createCourseCheckout: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const course = await ctx.db.course.findUnique({
        where: { id: input.courseId, isPublished: true },
      })

      if (!course) throw new TRPCError({ code: "NOT_FOUND" })
      if (course.isFree) throw new TRPCError({ code: "BAD_REQUEST", message: "Dette kurset er gratis" })

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "nok",
              unit_amount: course.price,
              product_data: {
                name: course.title,
                description: course.description.slice(0, 200),
              },
            },
          },
        ],
        metadata: {
          courseId: course.id,
          userId: ctx.session.user.id,
        },
        customer_email: ctx.session.user.email,
        success_url: `${env.NEXT_PUBLIC_APP_URL}/kurs/${course.slug}?success=1`,
        cancel_url: `${env.NEXT_PUBLIC_APP_URL}/kurs/${course.slug}`,
      })

      return { url: session.url }
    }),

  createSubscriptionCheckout: protectedProcedure
    .input(z.object({ plan: z.enum(["monthly", "yearly"]) }))
    .mutation(async ({ ctx, input }) => {
      const priceId =
        input.plan === "monthly"
          ? env.STRIPE_MONTHLY_PRICE_ID
          : env.STRIPE_YEARLY_PRICE_ID

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        metadata: {
          userId: ctx.session.user.id,
          plan: input.plan,
        },
        customer_email: ctx.session.user.email,
        success_url: `${env.NEXT_PUBLIC_APP_URL}/profil/kurs?subscribed=1`,
        cancel_url: `${env.NEXT_PUBLIC_APP_URL}/priser`,
      })

      return { url: session.url }
    }),

  createPortalSession: protectedProcedure.mutation(async ({ ctx }) => {
    const subscription = await ctx.db.subscription.findUnique({
      where: { userId: ctx.session.user.id },
    })

    if (!subscription) throw new TRPCError({ code: "NOT_FOUND", message: "Ingen aktiv abonnement funnet" })

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${env.NEXT_PUBLIC_APP_URL}/profil`,
    })

    return { url: session.url }
  }),

  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.subscription.findUnique({
      where: { userId: ctx.session.user.id },
    })
  }),
})
