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

      {/* Article header */}
      <div className="border-b border-gray-100 bg-white pb-10 pt-10">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Nyheter", href: "/nyheter" }, { label: article.title }]} />

          <div className="mt-6 flex items-center gap-3">
            <Badge variant="blue">Nyhet</Badge>
            {article.publishedAt && (
              <time className="text-sm text-gray-400">{formatDate(article.publishedAt)}</time>
            )}
            {article.readingTime && (
              <span className="text-sm text-gray-400">{article.readingTime} min lesing</span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl leading-[1.15]">
            {article.title}
          </h1>

          <p className="mt-5 text-lg text-gray-500 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">
              {article.author.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-gray-700">{article.author}</span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <AdSlot slot="article-top" format="rectangle" className="mb-10" />

          <div className="prose prose-aivett max-w-none">
            <MDXRemote source={article.content} />
          </div>

          <AdSlot slot="article-bottom" format="horizontal" className="mt-12" />

          <div className="mt-12 border-t border-gray-100 pt-8">
            <a
              href="/nyheter"
              className="text-sm font-medium text-violet-700 hover:text-violet-600 hover:underline"
            >
              &larr; Tilbake til nyheter
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
