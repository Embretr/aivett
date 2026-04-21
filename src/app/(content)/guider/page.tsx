export const dynamic = "force-dynamic"

import { buildMetadata } from "../../../lib/seo"
import { ArticleListPage } from "../../../components/shared/article-list-page"

export const metadata = buildMetadata({
  title: "AI-guider på norsk",
  description: "Dyptgående guider om AI-verktøy og konsepter, skrevet på norsk.",
  slug: "/guider",
})

export default function GuidesPage() {
  return (
    <ArticleListPage
      category="GUIDE"
      title="AI-guider"
      description="Dyptgående guider om AI-verktøy og konsepter"
      breadcrumbLabel="Guider"
    />
  )
}
