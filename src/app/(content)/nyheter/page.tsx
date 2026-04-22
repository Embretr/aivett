export const dynamic = "force-dynamic"

import { db } from "../../../server/db"
import { buildMetadata } from "../../../lib/seo"
import { AdSlot } from "../../../components/shared/ad-slot"
import { formatDate } from "../../../lib/utils"
import Link from "next/link"

export const metadata = buildMetadata({
  title: "Nyheter innen AI på norsk",
  description:
    "De siste nyhetene fra AI-verdenen, forklart på norsk. Hold deg oppdatert på kunstig intelligens.",
  slug: "/nyheter",
})

async function getNews() {
  return db.article.findMany({
    where: { published: true, category: "NEWS" },
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

export default async function NewsPage() {
  const articles = await getNews()
  const [lead, ...rest] = articles

  return (
    <div>
      {/* Hero — deep purple-black, broadcast circles */}
      <section className="relative overflow-hidden bg-[#0c0018] py-20 lg:py-28">
        {/* Repeating newsprint lines */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(167,139,250,0.04) 23px, rgba(167,139,250,0.04) 24px)",
          }}
        />
        {/* Broadcast circles */}
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3">
          {[160, 240, 320, 400].map((s) => (
            <div
              key={s}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/15"
              style={{ width: s, height: s }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-violet-400 animate-pulse" />
            <p className="text-sm font-medium tracking-widest text-violet-400 uppercase">
              Siste nytt
            </p>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white lg:text-6xl">
            Nyheter innen AI
          </h1>
          <p className="mt-4 max-w-xl text-lg text-violet-200/50">
            Det som skjer i kunstig intelligens — forklart på norsk.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdSlot slot="news-top" format="horizontal" className="mb-10" />

          {articles.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-gray-400">Ingen nyheter publisert enn. Kom tilbake snart!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              {/* Lead story */}
              {lead && (
                <div className="lg:col-span-2">
                  <p className="mb-5 text-xs font-semibold tracking-widest text-violet-700 uppercase">
                    Topphistorie
                  </p>
                  <Link href={`/nyheter/${lead.slug}`} className="group block">
                    <article>
                      <div className="aspect-video rounded-2xl bg-gray-100 overflow-hidden mb-5" />
                      <div className="flex items-center gap-3 mb-3">
                        {lead.publishedAt && (
                          <span className="font-mono text-xs text-gray-400">
                            {formatDate(lead.publishedAt)}
                          </span>
                        )}
                        {lead.readingTime && (
                          <span className="text-xs text-gray-400">{lead.readingTime} min</span>
                        )}
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight text-gray-950 group-hover:text-violet-700 transition-colors leading-snug">
                        {lead.title}
                      </h2>
                      <p className="mt-3 text-gray-500 leading-relaxed">{lead.excerpt}</p>
                      <span className="mt-4 inline-block text-sm font-medium text-violet-700 group-hover:underline">
                        Les mer
                      </span>
                    </article>
                  </Link>
                </div>
              )}

              {/* Compact editorial rows */}
              <div>
                <p className="mb-5 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Flere nyheter
                </p>
                <div className="divide-y divide-gray-100">
                  {rest.map((article) => (
                    <Link
                      key={article.id}
                      href={`/nyheter/${article.slug}`}
                      className="group flex flex-col gap-1 py-4 first:pt-0"
                    >
                      {article.publishedAt && (
                        <span className="font-mono text-[11px] text-gray-400">
                          {formatDate(article.publishedAt)}
                        </span>
                      )}
                      <h3 className="text-sm font-semibold text-gray-950 group-hover:text-violet-700 transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>
                      {article.readingTime && (
                        <span className="text-[11px] text-gray-400">
                          {article.readingTime} min lesing
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
