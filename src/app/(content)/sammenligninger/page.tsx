export const dynamic = "force-dynamic"

import { db } from "../../../server/db"
import { buildMetadata } from "../../../lib/seo"
import { formatDate } from "../../../lib/utils"
import Link from "next/link"

export const metadata = buildMetadata({
  title: "AI-sammenligninger på norsk",
  description:
    "Uavhengige sammenligninger av AI-verktøy og tjenester — slik at du velger riktig.",
  slug: "/sammenligninger",
})

async function getComparisons() {
  return db.article.findMany({
    where: { published: true, category: "COMPARISON" },
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

export default async function ComparisonsPage() {
  const comparisons = await getComparisons()

  return (
    <div>
      {/* Hero — dark purple, VS split aesthetic */}
      <section className="relative overflow-hidden bg-[#180830] py-24 lg:py-32">
        {/* Diagonal lines */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-violet-400/8"
              style={{ left: `${10 + i * 12}%`, transform: `rotate(${i % 2 === 0 ? 12 : -12}deg)` }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
            {/* Text */}
            <div className="max-w-md text-center lg:text-left">
              <p className="text-sm font-medium tracking-widest text-violet-400 uppercase">
                Uavhengige tester
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-6xl">
                AI<br />
                <span className="text-violet-300">sammenlignet</span>
              </h1>
              <p className="mt-5 text-lg text-violet-200/50">
                Vi tester AI-verktøy opp mot hverandre slik at du slipper å gjøre det selv.
              </p>
              <p className="mt-6 text-sm text-violet-400/60">
                {comparisons.length} sammenligninger
              </p>
            </div>

            {/* VS graphic */}
            <div className="pointer-events-none shrink-0 flex items-center gap-5">
              <div className="size-28 rounded-2xl border-2 border-violet-400/40 bg-violet-400/10 rotate-3" />
              <span className="text-5xl font-bold text-white/20 select-none">vs</span>
              <div className="size-28 rounded-2xl border-2 border-violet-300/30 bg-violet-300/5 -rotate-3" />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison grid — 2-col with split top bar */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {comparisons.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-gray-400">Ingen sammenligninger publisert enn. Kom tilbake snart!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {comparisons.map((comparison) => (
                <Link
                  key={comparison.id}
                  href={`/sammenligninger/${comparison.slug}`}
                  className="group block"
                >
                  <article className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-md hover:border-gray-300">
                    {/* Split top bar */}
                    <div className="flex h-2">
                      <div className="flex-1 bg-violet-100" />
                      <div className="w-px bg-white" />
                      <div className="flex-1 bg-indigo-100" />
                    </div>
                    <div className="p-6">
                      <h2 className="text-base font-semibold text-gray-950 group-hover:text-violet-700 transition-colors line-clamp-2 leading-snug">
                        {comparison.title}
                      </h2>
                      <p className="mt-2 text-sm text-gray-500 line-clamp-3">{comparison.excerpt}</p>
                      <div className="mt-5 flex items-center gap-2 text-xs text-gray-400">
                        {comparison.author && <span>{comparison.author}</span>}
                        {comparison.readingTime && (
                          <>
                            <span>·</span>
                            <span>{comparison.readingTime} min</span>
                          </>
                        )}
                        {comparison.publishedAt && (
                          <>
                            <span>·</span>
                            <span>{formatDate(comparison.publishedAt)}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
