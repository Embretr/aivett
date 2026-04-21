export const dynamic = "force-dynamic"

import { buildMetadata } from "../../../lib/seo"
import { ArticleListPage } from "../../../components/shared/article-list-page"

export const metadata = buildMetadata({
  title: "AI-veiledninger pa norsk",
  description: "Steg-for-steg veiledninger for a ta i bruk AI-verktoy — pa norsk.",
  slug: "/veiledninger",
})

export default function TutorialsPage() {
  return (
    <ArticleListPage
      category="TUTORIAL"
      title="AI-veiledninger"
      description="Steg-for-steg veiledninger for a ta i bruk AI"
      breadcrumbLabel="Veiledninger"
    />
  )
}
