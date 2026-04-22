export const dynamic = "force-dynamic"

import { db } from "../../../server/db"
import { CourseCard } from "../../../components/courses/course-card"
import { buildMetadata } from "../../../lib/seo"
import Link from "next/link"

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
  const [featured, ...rest] = courses

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-violet-950 py-24 lg:py-32">
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="size-96 rounded-full bg-violet-600/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
            {/* Text */}
            <div className="max-w-md text-center lg:text-left">
              <p className="text-sm font-medium tracking-widest text-violet-400 uppercase">
                AIvett kurs
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-6xl">
                Lær AI.<br />
                <span className="text-violet-300">På norsk.</span>
              </h1>
              <p className="mt-5 text-lg text-violet-200/70">
                Strukturerte kurs fra nybegynner til avansert — med leksjoner, quizer og praktiske øvelser.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
                <span className="text-sm text-violet-300/70">
                  {courses.length} kurs tilgjengelig
                </span>
                <span className="text-violet-600">·</span>
                <span className="text-sm text-violet-300/70">Oppdateres løpende</span>
              </div>
            </div>

            {/* 3D floating card stack */}
            <div className="pointer-events-none shrink-0" style={{ perspective: "900px" }}>
              <div className="relative h-48 w-72">
                <div
                  className="absolute inset-0 rounded-2xl border border-violet-400/20 bg-violet-900/60 shadow-2xl"
                  style={{ transform: "rotateY(-18deg) rotateX(6deg) translateZ(0px)" }}
                />
                <div
                  className="absolute inset-0 rounded-2xl border border-violet-400/30 bg-violet-800/70 shadow-2xl"
                  style={{ transform: "rotateY(-18deg) rotateX(6deg) translateZ(28px)" }}
                />
                <div
                  className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-violet-300/40 bg-violet-700/80 p-5 shadow-2xl"
                  style={{ transform: "rotateY(-18deg) rotateX(6deg) translateZ(56px)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-white/10" />
                    <div className="h-2.5 w-28 rounded-full bg-white/20" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 w-full rounded-full bg-white/15" />
                    <div className="h-2 w-4/5 rounded-full bg-white/10" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-2 w-16 rounded-full bg-violet-300/50" />
                    <div className="rounded-lg bg-white/15 px-3 py-1 text-xs font-medium text-white/70">
                      Start kurs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course list */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {courses.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-gray-400">Ingen kurs publisert enn. Kom tilbake snart!</p>
            </div>
          ) : (
            <>
              {/* Featured course */}
              {featured && (
                <div className="mb-12">
                  <p className="mb-4 text-xs font-semibold tracking-widest text-violet-700 uppercase">
                    Fremhevet kurs
                  </p>
                  <Link href={`/kurs/${featured.slug}`} className="group block">
                    <article className="grid grid-cols-1 overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all hover:shadow-lg hover:border-gray-300 lg:grid-cols-2">
                      <div className="aspect-video bg-gradient-to-br from-violet-50 to-indigo-100 flex items-center justify-center lg:aspect-auto">
                        <div className="size-20 rounded-2xl bg-violet-200/60 flex items-center justify-center">
                          <div className="size-8 rounded-lg bg-violet-400/60" />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center p-8 lg:p-10">
                        <span className="text-xs font-semibold tracking-widest text-violet-700 uppercase">
                          {featured.isFree ? "Gratis" : "Premium"}
                        </span>
                        <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-950 group-hover:text-violet-700 transition-colors">
                          {featured.title}
                        </h2>
                        <p className="mt-3 text-gray-500">{featured.description}</p>
                        <div className="mt-6 flex items-center gap-4 text-sm text-gray-400">
                          <span>
                            {featured.modules.reduce((s, m) => s + m.lessons.length, 0)} leksjoner
                          </span>
                          {featured.duration && <span>{featured.duration} min</span>}
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              )}

              {/* Rest of courses */}
              {rest.length > 0 && (
                <>
                  <p className="mb-6 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                    Alle kurs
                  </p>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
