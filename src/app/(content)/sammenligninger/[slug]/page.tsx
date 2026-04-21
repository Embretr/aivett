import { buildMetadata } from "../../../../lib/seo"
import { ArticleDetailPage, generateArticleMetadata } from "../../../../components/shared/article-detail-page"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await generateArticleMetadata(slug, "COMPARISON")
  if (!article) return {}
  return buildMetadata({
    title: article.metaTitle ?? article.title,
    description: article.metaDescription ?? article.excerpt,
    slug: `/sammenligninger/${slug}`,
    ogImage: article.ogImage ?? undefined,
    type: "article",
    publishedTime: article.publishedAt?.toISOString(),
    authors: [article.author],
  })
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ArticleDetailPage slug={slug} category="COMPARISON" />
}
