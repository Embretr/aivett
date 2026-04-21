export const dynamic = "force-dynamic"

import { db } from "../../../server/db"
import { CourseCard } from "../../../components/courses/course-card"
import { buildMetadata } from "../../../lib/seo"
import { Breadcrumbs } from "../../../components/shared/breadcrumbs"

export const metadata = buildMetadata({
  title: "AI-kurs på norsk",
  description:
    "Utforsk alle AI-kursene på AIvett. Fra nybegynner til avansert — strukturerte kurs med leksjoner, quizer og praktiske oppgaver.",
  slug: "/kurs",
})

async function getCourses() {
  return db.course.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    include: {
      modules: { include: { lessons: { select: { id: true } } } },
    },
  })
}

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Kurs" }]} />
        <div className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950">AI-kurs på norsk</h1>
          <p className="mt-3 text-lg text-gray-500">
            {courses.length} kurs tilgjengelig — gratis og premium
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="mt-20 text-center">
            <p className="text-gray-500">Ingen kurs publisert enn. Kom tilbake snart!</p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
