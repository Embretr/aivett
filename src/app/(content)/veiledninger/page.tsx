export const dynamic = "force-dynamic"

import { db } from "../../../server/db"
import { buildMetadata } from "../../../lib/seo"
import { formatDate } from "../../../lib/utils"
import Link from "next/link"

export const metadata = buildMetadata({
  title: "AI-veiledninger på norsk",
  description: "Steg-for-steg veiledninger for å ta i bruk AI-verktøy — på norsk.",
  slug: "/veiledninger",
})

async function getTutorials() {
  return db.article.findMany({
    where: { published: true, category: "TUTORIAL" },
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
}

export default async function TutorialsPage() {
  const tutorials = await getTutorials()

  return (
    <div>
      {/* Hero — deep indigo-violet, connected step circles */}
      <section className="relative overflow-hidden bg-indigo-950 py-24 lg:py-32">
        {/* Radial glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="size-[600px] rounded-full bg-violet-700/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
            {/* Text */}
            <div className="max-w-md text-center lg:text-left">
              <p className="text-sm font-medium tracking-widest text-violet-400 uppercase">
                Steg for steg
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-6xl">
                AI-veiledninger
              </h1>
              <p className="mt-5 text-lg text-violet-100/60">
                Praktiske steg-for-steg veiledninger som tar deg fra null til resultat med AI-verktøy.
              </p>
              <p className="mt-6 text-sm text-violet-400/60">
                {tutorials.length} veiledninger tilgjengelig
              </p>
            </div>

            {/* Step visualization */}
            <div className="pointer-events-none shrink-0 flex items-center">
              {[1, 2, 3].map((n, i) => (
                <div key={n} className="flex items-center">
                  <div className="flex size-16 items-center justify-center rounded-full border-2 border-violet-400/60 bg-violet-400/10 text-lg font-bold text-violet-300">
                    {n}
                  </div>
                  {i < 2 && <div className="w-12 h-0.5 bg-violet-400/30" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial list — big numbers */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {tutorials.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-gray-400">Ingen veiledninger publisert enn. Kom tilbake snart!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {tutorials.map((tutorial, i) => (
                <Link
                  key={tutorial.id}
                  href={`/veiledninger/${tutorial.slug}`}
                  className="group flex gap-6 py-8 first:pt-0"
                >
                  {/* Big number */}
                  <span className="shrink-0 text-5xl font-bold tabular-nums leading-none text-gray-100 group-hover:text-violet-400 transition-colors select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-gray-950 group-hover:text-violet-700 transition-colors line-clamp-2 leading-snug">
                      {tutorial.title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">{tutorial.excerpt}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                      {tutorial.author && <span>{tutorial.author}</span>}
                      {tutorial.readingTime && (
                        <>
                          <span>·</span>
                          <span>{tutorial.readingTime} min lesing</span>
                        </>
                      )}
                      {tutorial.publishedAt && (
                        <>
                          <span>·</span>
                          <span>{formatDate(tutorial.publishedAt)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
