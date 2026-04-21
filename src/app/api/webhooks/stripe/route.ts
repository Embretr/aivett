import { headers } from "next/headers"
import { NextResponse } from "next/server"
import type Stripe from "stripe"
import { stripe } from "../../../../lib/stripe"
import { db } from "../../../../server/db"
import { env } from "../../../../../env"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get("stripe-signature")

  if (!signature) {
    return new NextResponse("Missing stripe-signature header", { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err)
    return new NextResponse("Webhook signature verification failed", { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        if (!session.metadata?.userId) break

        if (session.mode === "payment") {
          // One-time course purchase
          const courseId = session.metadata.courseId
          if (!courseId) break

          const expiresAt = new Date()
          expiresAt.setFullYear(expiresAt.getFullYear() + 1)

          await db.$transaction([
            db.purchase.create({
              data: {
                userId: session.metadata.userId,
                courseId,
                stripePaymentIntentId: session.payment_intent as string,
                stripeCustomerId: session.customer as string | undefined,
                amount: session.amount_total ?? 0,
              },
            }),
            db.userCourseAccess.upsert({
              where: {
                userId_courseId: {
                  userId: session.metadata.userId,
                  courseId,
                },
              },
              create: {
                userId: session.metadata.userId,
                courseId,
                accessType: "PURCHASED",
                expiresAt,
              },
              update: {
                expiresAt,
                accessType: "PURCHASED",
              },
            }),
          ])
        } else if (session.mode === "subscription") {
          // Subscription — access granted via subscription.updated event
        }
        break
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId
        if (!userId) break

        const status =
          subscription.status === "active"
            ? "ACTIVE"
            : subscription.status === "canceled"
              ? "CANCELED"
              : "PAST_DUE"

        await db.subscription.upsert({
          where: { stripeSubscriptionId: subscription.id },
          create: {
            userId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            status,
            planId: subscription.items.data[0]?.price.id ?? "",
            currentPeriodEnd: new Date((subscription as unknown as { current_period_end: number }).current_period_end * 1000),
          },
          update: {
            status,
            currentPeriodEnd: new Date((subscription as unknown as { current_period_end: number }).current_period_end * 1000),
          },
        })

        // Grant access to all published courses
        if (status === "ACTIVE") {
          const courses = await db.course.findMany({
            where: { isPublished: true, isFree: false },
            select: { id: true },
          })

          await db.$transaction(
            courses.map((course) =>
              db.userCourseAccess.upsert({
                where: {
                  userId_courseId: { userId, courseId: course.id },
                },
                create: {
                  userId,
                  courseId: course.id,
                  accessType: "SUBSCRIPTION",
                  expiresAt: null,
                },
                update: {
                  accessType: "SUBSCRIPTION",
                  expiresAt: null,
                },
              })
            )
          )
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        await db.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: { status: "CANCELED" },
        })

        // Revoke subscription-based access
        const sub = await db.subscription.findUnique({
          where: { stripeSubscriptionId: subscription.id },
          select: { userId: true },
        })

        if (sub) {
          await db.userCourseAccess.deleteMany({
            where: {
              userId: sub.userId,
              accessType: "SUBSCRIPTION",
            },
          })
        }
        break
      }
    }

    return new NextResponse("OK", { status: 200 })
  } catch (err) {
    console.error("Stripe webhook handler error:", err)
    return new NextResponse("Webhook handler failed", { status: 500 })
  }
}
