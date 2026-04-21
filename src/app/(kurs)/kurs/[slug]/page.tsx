export const dynamic = "force-dynamic"

import { notFound } from "next/navigation"
import Link from "next/link"
import { db } from "../../../../server/db"
import { auth } from "../../../../server/auth"
import { buildMetadata, courseJsonLd, breadcrumbJsonLd } from "../../../../lib/seo"
import { Button } from "../../../../components/ui/button"
import { Badge } from "../../../../components/ui/badge"
import { Breadcrumbs } from "../../../../components/shared/breadcrumbs"
import { formatNOK } from "../../../../lib/utils"
import {
  BookOpenIcon,
  ClockIcon,
  ChartBarIcon,
  CheckCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline"
import { headers } from "next/headers"
import { CourseCheckoutButton } from "../../../../components/courses/course-checkout-button"

const levelLabels: Record<string, string> = {
  BEGINNER: "Nybegynner",
  INTERMEDIATE: "Videregående",
  ADVANCED: "Avansert",
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = await db.course.findUnique({ where: { slug, isPublished: true } })
  if (!course) return {}
  return buildMetadata({
    title: course.title,
    description: course.description,
    slug: `/kurs/${slug}`,
  })
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const course = await db.course.findUnique({
    where: { slug, isPublished: true },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            select: { id: true, slug: true, title: true, duration: true, isPreview: true },
          },
        },
      },
    },
  })

  if (!course) notFound()

  const session = await auth.api.getSession({ headers: await headers() })

  let hasAccess = course.isFree
  if (session && !hasAccess) {
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

  const lessonCount = course.modules.reduce((sum, m) => sum + m.lessons.length, 0)
  const firstLesson = course.modules[0]?.lessons[0]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd({ ...course, level: course.level, price: course.price })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Hjem", url: process.env.NEXT_PUBLIC_APP_URL ?? "" },
              { name: "Kurs", url: `${process.env.NEXT_PUBLIC_APP_URL}/kurs` },
              { name: course.title, url: `${process.env.NEXT_PUBLIC_APP_URL}/kurs/${slug}` },
            ])
          ),
        }}
      />

      <div className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Kurs", href: "/kurs" }, { label: course.title }]}
          />

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant={course.level === "BEGINNER" ? "success" : course.level === "INTERMEDIATE" ? "warning" : "secondary"}>
                  {levelLabels[course.level] ?? course.level}
                </Badge>
                {course.isFree && <Badge variant="success">Gratis</Badge>}
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                {course.title}
              </h1>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">{course.description}</p>

              <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <BookOpenIcon className="size-4" />
                  {lessonCount} leksjoner
                </span>
                {course.duration && (
                  <span className="flex items-center gap-1.5">
                    <ClockIcon className="size-4" />
                    {course.duration} minutter totalt
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <ChartBarIcon className="size-4" />
                  {levelLabels[course.level]}
                </span>
              </div>

              {/* Curriculum */}
              <div className="mt-12">
                <h2 className="text-xl font-bold text-gray-950 mb-6">Innhold</h2>
                <div className="space-y-4">
                  {course.modules.map((module) => (
                    <div key={module.id} className="rounded-2xl border border-gray-200 overflow-hidden">
                      <div className="bg-gray-50 px-5 py-3">
                        <h3 className="font-semibold text-sm text-gray-950">{module.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {module.lessons.length} leksjoner
                        </p>
                      </div>
                      <ul className="divide-y divide-gray-100">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.id} className="flex items-center justify-between px-5 py-3">
                            <div className="flex items-center gap-2.5 min-w-0">
                              {lesson.isPreview || hasAccess ? (
                                <CheckCircleIcon className="size-4 shrink-0 text-green-400" />
                              ) : (
                                <LockClosedIcon className="size-4 shrink-0 text-gray-300" />
                              )}
                              <span className="text-sm text-gray-700 truncate">{lesson.title}</span>
                            </div>
                            <div className="flex items-center gap-3 ml-4 shrink-0">
                              {lesson.isPreview && !hasAccess && (
                                <Badge variant="blue">Forhåndsvisning</Badge>
                              )}
                              {lesson.duration && (
                                <span className="text-xs text-gray-400">{lesson.duration} min</span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                {hasAccess ? (
                  <>
                    <Badge variant="success" className="mb-4">Du har tilgang</Badge>
                    <h3 className="font-semibold text-gray-950">Fortsett kurset</h3>
                    {firstLesson && (
                      <Link href={`/kurs/${slug}/leksjoner/${firstLesson.slug}`}>
                        <Button className="w-full mt-4">Start kurs</Button>
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-3xl font-bold text-gray-950">
                        {course.isFree ? "Gratis" : formatNOK(course.price)}
                      </span>
                      {!course.isFree && (
                        <span className="text-sm text-gray-500">· 1 års tilgang</span>
                      )}
                    </div>

                    {course.isFree ? (
                      <Link href={firstLesson ? `/kurs/${slug}/leksjoner/${firstLesson.slug}` : `/logg-inn`}>
                        <Button className="w-full mt-4">Start gratis kurs</Button>
                      </Link>
                    ) : (
                      <CourseCheckoutButton courseId={course.id} courseTitle={course.title} />
                    )}

                    <p className="mt-3 text-center text-xs text-gray-400">
                      14 dagers pengene-tilbake-garanti
                    </p>

                    <div className="mt-6 space-y-2">
                      <Link href="/priser">
                        <Button variant="secondary" className="w-full">
                          Se alle kurs — fra 249 kr/måned
                        </Button>
                      </Link>
                    </div>
                  </>
                )}

                <ul className="mt-6 space-y-2 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="size-4 text-green-500 shrink-0" />
                    {lessonCount} leksjoner
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="size-4 text-green-500 shrink-0" />
                    Quizer og oppgaver
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="size-4 text-green-500 shrink-0" />
                    Fremgangssporingen
                  </li>
                  {!course.isFree && (
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="size-4 text-green-500 shrink-0" />1 års tilgang
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
