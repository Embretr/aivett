export const dynamic = "force-dynamic"

import { db } from "../../../server/db"
import { buildMetadata } from "../../../lib/seo"
import { formatDate } from "../../../lib/utils"
import Link from "next/link"

export const metadata = buildMetadata({
  title: "AI-guider på norsk",
  description: "Dyptgående guider om AI-verktøy og konsepter, skrevet på norsk.",
  slug: "/guider",
})

async function getGuides() {
  return db.article.findMany({
    where: { published: true, category: "GUIDE" },
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

export default async function GuidesPage() {
  const guides = await getGuides()

  return (
    <div>
      {/* Hero — deep violet, diamond grid + hexagon outlines */}
      <section className="relative overflow-hidden bg-violet-950 py-20 lg:py-28">
        {/* SVG diamond grid */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="diamonds"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect
                x="0"
                y="0"
                width="38"
                height="38"
                fill="none"
                stroke="rgba(196,181,253,0.08)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamonds)" />
        </svg>

        {/* Nested hexagon outlines */}
        <svg
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-25"
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[180, 130, 80].map((r, i) => (
            <polygon
              key={r}
              points={Array.from({ length: 6 }, (_, k) => {
                const a = (Math.PI / 3) * k - Math.PI / 6
                return `${200 + r * Math.cos(a)},${200 + r * Math.sin(a)}`
              }).join(" ")}
              stroke="#a78bfa"
              strokeWidth={i === 0 ? 1 : 1.5}
              fill="none"
              opacity={0.4 + i * 0.2}
            />
          ))}
        </svg>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-medium tracking-widest text-violet-400 uppercase">
            AIvett guider
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white lg:text-6xl">
            Dyptgående AI-guider
          </h1>
          <p className="mt-4 max-w-xl text-lg text-violet-200/50">
            Alt du trenger å vite om AI-verktøy og konsepter — grundig gjennomgått på norsk.
          </p>
        </div>
      </section>

      {/* Guide list — horizontal cards with accent bar */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {guides.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-gray-400">Ingen guider publisert enn. Kom tilbake snart!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {guides.map((guide, i) => (
                <Link key={guide.id} href={`/guider/${guide.slug}`} className="group block">
                  <article className="flex items-stretch gap-5 rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:shadow-md hover:border-gray-300">
                    {/* Accent bar */}
                    <div className="w-1 self-stretch rounded-full bg-violet-200 group-hover:bg-violet-600 transition-colors" />

                    {/* Index */}
                    <span className="shrink-0 text-2xl font-bold tabular-nums text-gray-200 group-hover:text-violet-300 transition-colors w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base font-semibold text-gray-950 group-hover:text-violet-700 transition-colors line-clamp-1">
                        {guide.title}
                      </h2>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{guide.excerpt}</p>
                    </div>

                    {/* Meta */}
                    <div className="shrink-0 flex flex-col items-end justify-between text-xs text-gray-400">
                      {guide.publishedAt && <span>{formatDate(guide.publishedAt)}</span>}
                      {guide.readingTime && <span>{guide.readingTime} min</span>}
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
