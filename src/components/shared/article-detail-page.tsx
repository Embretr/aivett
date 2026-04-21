import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { db } from "../../server/db"
import { articleJsonLd, breadcrumbJsonLd } from "../../lib/seo"
import { Breadcrumbs } from "./breadcrumbs"
import { AdSlot } from "./ad-slot"
import { Badge } from "../ui/badge"
import { formatDate } from "../../lib/utils"
import type { ArticleCategory } from "@prisma/client"

const categoryConfig = {
  NEWS: { label: "Nyhet", variant: "blue" as const, path: "nyheter", breadcrumb: "Nyheter" },
  GUIDE: { label: "Guide", variant: "purple" as const, path: "guider", breadcrumb: "Guider" },
  TUTORIAL: { label: "Veiledning", variant: "default" as const, path: "veiledninger", breadcrumb: "Veiledninger" },
  COMPARISON: { label: "Sammenligning", variant: "warning" as const, path: "sammenligninger", breadcrumb: "Sammenligninger" },
}

interface ArticleDetailPageProps {
  slug: string
  category: ArticleCategory
}

export async function ArticleDetailPage({ slug, category }: ArticleDetailPageProps) {
  const article = await db.article.findUnique({
    where: { slug, published: true, category },
  })

  if (!article) notFound()

  const config = categoryConfig[category]
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
              { name: config.breadcrumb, url: `${baseUrl}/${config.path}` },
              { name: article.title, url: `${baseUrl}/${config.path}/${slug}` },
            ])
          ),
        }}
      />

      <div className="py-12">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: config.breadcrumb, href: `/${config.path}` },
              { label: article.title },
            ]}
          />

          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={config.variant}>{config.label}</Badge>
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

          <AdSlot slot={`${config.path}-article-top`} format="rectangle" className="my-8" />

          <div className="prose-aivett prose prose-gray max-w-none mt-8">
            <MDXRemote source={article.content} />
          </div>

          <AdSlot slot={`${config.path}-article-bottom`} format="horizontal" className="mt-8" />
        </div>
      </div>
    </>
  )
}

export async function generateArticleMetadata(slug: string, category: ArticleCategory) {
  const article = await db.article.findUnique({
    where: { slug, published: true, category },
    select: {
      title: true,
      metaTitle: true,
      excerpt: true,
      metaDescription: true,
      ogImage: true,
      publishedAt: true,
      author: true,
    },
  })
  return article
}
