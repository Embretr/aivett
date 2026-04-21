export const dynamic = "force-dynamic"

import { db } from "../../../server/db"
import { ArticleCard } from "../../../components/shared/article-card"
import { buildMetadata } from "../../../lib/seo"
import { Breadcrumbs } from "../../../components/shared/breadcrumbs"
import { AdSlot } from "../../../components/shared/ad-slot"

export const metadata = buildMetadata({
  title: "AI-nyheter på norsk",
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

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Nyheter" }]} />
        <div className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950">AI-nyheter</h1>
          <p className="mt-2 text-gray-500">Hold deg oppdatert på kunstig intelligens — på norsk</p>
        </div>

        <AdSlot slot="news-top" format="horizontal" className="mt-6" />

        {articles.length === 0 ? (
          <div className="mt-20 text-center">
            <p className="text-gray-500">Ingen nyheter publisert enn. Kom tilbake snart!</p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
