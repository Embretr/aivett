export const dynamic = "force-dynamic"

import { buildMetadata } from "../../../lib/seo"
import { ArticleListPage } from "../../../components/shared/article-list-page"

export const metadata = buildMetadata({
  title: "AI-guider pa norsk",
  description: "Dyptgaende guider om AI-verktoy og konsepter, skrevet pa norsk.",
  slug: "/guider",
})

export default function GuidesPage() {
  return (
    <ArticleListPage
      category="GUIDE"
      title="AI-guider"
      description="Dyptgaende guider om AI-verktoy og konsepter"
      breadcrumbLabel="Guider"
    />
  )
}
