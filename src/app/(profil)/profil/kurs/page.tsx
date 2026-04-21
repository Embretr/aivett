export const dynamic = "force-dynamic"

import { redirect } from "next/navigation"
import { headers } from "next/headers"
import Link from "next/link"
import { auth } from "../../../../server/auth"
import { db } from "../../../../server/db"
import { buildMetadata } from "../../../../lib/seo"
import { CourseCard } from "../../../../components/courses/course-card"
import { Progress } from "../../../../components/ui/progress"
import { Badge } from "../../../../components/ui/badge"
import { Breadcrumbs } from "../../../../components/shared/breadcrumbs"

export const metadata = buildMetadata({
  title: "Mine kurs",
  slug: "/profil/kurs",
})

export default async function MyCoursesPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/logg-inn?redirect=/profil/kurs")

  const [accesses, subscription] = await Promise.all([
    db.userCourseAccess.findMany({
      where: {
        userId: session.user.id,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      include: {
        course: {
          include: {
            modules: { include: { lessons: { select: { id: true } } } },
          },
        },
      },
    }),
    db.subscription.findUnique({ where: { userId: session.user.id } }),
  ])

  // Get progress for all lessons in accessed courses
  const allLessonIds = accesses.flatMap((a) =>
    a.course.modules.flatMap((m) => m.lessons.map((l) => l.id))
  )

  const completedProgress = await db.lessonProgress.findMany({
    where: { userId: session.user.id, lessonId: { in: allLessonIds } },
    select: { lessonId: true },
  })
  const completedSet = new Set(completedProgress.map((p) => p.lessonId))

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Profil", href: "/profil" }, { label: "Mine kurs" }]} />

        <div className="mt-6 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-950">Mine kurs</h1>
            {subscription?.status === "ACTIVE" && (
              <div className="mt-2">
                <Badge variant="success">Aktivt abonnement — tilgang til alle kurs</Badge>
              </div>
            )}
          </div>
          <Link
            href="/kurs"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Utforsk flere kurs &rarr;
          </Link>
        </div>

        {accesses.length === 0 ? (
          <div className="mt-20 text-center">
            <p className="text-gray-500 mb-4">Du har ikke kjøpt noen kurs ennå.</p>
            <Link href="/kurs">
              <span className="text-sm font-medium text-blue-600 hover:underline">
                Se alle kurs &rarr;
              </span>
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {accesses.map((access) => {
              const course = access.course
              const lessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id))
              const completed = lessonIds.filter((id) => completedSet.has(id)).length
              const percentage = lessonIds.length > 0
                ? Math.round((completed / lessonIds.length) * 100)
                : 0

              return (
                <div key={access.id} className="space-y-2">
                  <CourseCard course={course} />
                  <div className="px-1">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>{completed}/{lessonIds.length} leksjoner fullført</span>
                      <span>{percentage}%</span>
                    </div>
                    <Progress value={percentage} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
