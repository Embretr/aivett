export const dynamic = "force-dynamic"

import { buildMetadata } from "../../../lib/seo"
import { ArticleListPage } from "../../../components/shared/article-list-page"

export const metadata = buildMetadata({
  title: "AI-veiledninger på norsk",
  description: "Steg-for-steg veiledninger for å ta i bruk AI-verktøy — på norsk.",
  slug: "/veiledninger",
})

export default function TutorialsPage() {
  return (
    <ArticleListPage
      category="TUTORIAL"
      title="AI-veiledninger"
      description="Steg-for-steg veiledninger for å ta i bruk AI"
      breadcrumbLabel="Veiledninger"
    />
  )
}
