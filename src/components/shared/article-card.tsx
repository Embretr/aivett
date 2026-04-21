import Link from "next/link"
import { formatDate } from "../../lib/utils"
import { Badge } from "../ui/badge"

const categoryLabels: Record<string, { label: string; variant: "blue" | "purple" | "default" | "warning" }> = {
  NEWS: { label: "Nyhet", variant: "blue" },
  GUIDE: { label: "Guide", variant: "purple" },
  TUTORIAL: { label: "Veiledning", variant: "default" },
  COMPARISON: { label: "Sammenligning", variant: "warning" },
}

const categoryPaths: Record<string, string> = {
  NEWS: "nyheter",
  GUIDE: "guider",
  TUTORIAL: "veiledninger",
  COMPARISON: "sammenligninger",
}

interface ArticleCardProps {
  article: {
    id: string
    slug: string
    title: string
    excerpt: string
    category: string
    publishedAt: Date | null
    author: string
    readingTime: number | null
    ogImage: string | null
  }
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { label, variant } = categoryLabels[article.category] ?? { label: article.category, variant: "default" }
  const path = categoryPaths[article.category] ?? "nyheter"

  return (
    <Link href={`/${path}/${article.slug}`} className="group block">
      <article className="h-full rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-md hover:border-gray-300">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant={variant}>{label}</Badge>
          {article.publishedAt && (
            <span className="text-xs text-gray-400">{formatDate(article.publishedAt)}</span>
          )}
        </div>
        <h2 className="text-base font-semibold text-gray-950 group-hover:text-violet-700 transition-colors line-clamp-2">
          {article.title}
        </h2>
        <p className="mt-2 text-sm text-gray-500 line-clamp-3">{article.excerpt}</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
          <span>{article.author}</span>
          {article.readingTime && (
            <>
              <span>·</span>
              <span>{article.readingTime} min lesing</span>
            </>
          )}
        </div>
      </article>
    </Link>
  )
}
