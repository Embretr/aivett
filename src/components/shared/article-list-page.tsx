import { db } from "../../server/db"
import { ArticleCard } from "./article-card"
import { Breadcrumbs } from "./breadcrumbs"
import { AdSlot } from "./ad-slot"
import type { ArticleCategory } from "@prisma/client"

interface ArticleListPageProps {
  category: ArticleCategory
  title: string
  description: string
  breadcrumbLabel: string
}

export async function ArticleListPage({
  category,
  title,
  description,
  breadcrumbLabel,
}: ArticleListPageProps) {
  const articles = await db.article.findMany({
    where: { published: true, category },
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

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumbs items={[{ label: breadcrumbLabel }]} />
        <div className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950">{title}</h1>
          <p className="mt-2 text-gray-500">{description}</p>
        </div>

        <AdSlot slot={`${category.toLowerCase()}-top`} format="horizontal" className="mt-6" />

        {articles.length === 0 ? (
          <div className="mt-20 text-center">
            <p className="text-gray-500">Ingen artikler publisert enn. Kom tilbake snart!</p>
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
