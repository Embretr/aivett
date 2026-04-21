import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { db } from "../../../../server/db"
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "../../../../lib/seo"
import { Breadcrumbs } from "../../../../components/shared/breadcrumbs"
import { AdSlot } from "../../../../components/shared/ad-slot"
import { formatDate } from "../../../../lib/utils"
import { Badge } from "../../../../components/ui/badge"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await db.article.findUnique({
    where: { slug, published: true, category: "NEWS" },
  })
  if (!article) return {}
  return buildMetadata({
    title: article.metaTitle ?? article.title,
    description: article.metaDescription ?? article.excerpt,
    slug: `/nyheter/${slug}`,
    ogImage: article.ogImage ?? undefined,
    type: "article",
    publishedTime: article.publishedAt?.toISOString(),
    authors: [article.author],
  })
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await db.article.findUnique({
    where: { slug, published: true, category: "NEWS" },
  })

  if (!article) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://aivett.no"

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Hjem", url: baseUrl },
              { name: "Nyheter", url: `${baseUrl}/nyheter` },
              { name: article.title, url: `${baseUrl}/nyheter/${slug}` },
            ])
          ),
        }}
      />

      <div className="py-12">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Nyheter", href: "/nyheter" }, { label: article.title }]} />

          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="blue">Nyhet</Badge>
              {article.publishedAt && (
                <time className="text-sm text-gray-400">{formatDate(article.publishedAt)}</time>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl leading-tight">
              {article.title}
            </h1>
            <p className="mt-4 text-lg text-gray-500 leading-relaxed">{article.excerpt}</p>

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
              <span>{article.author}</span>
              {article.readingTime && (
                <>
                  <span>·</span>
                  <span>{article.readingTime} min lesing</span>
                </>
              )}
            </div>
          </div>

          <AdSlot slot="article-top" format="rectangle" className="my-8" />

          <div className="prose-aivett prose prose-gray max-w-none mt-8">
            <MDXRemote source={article.content} />
          </div>

          <AdSlot slot="article-bottom" format="horizontal" className="mt-8" />
        </div>
      </div>
    </>
  )
}
