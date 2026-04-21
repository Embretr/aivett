export const dynamic = "force-dynamic"

import { buildMetadata } from "../../../lib/seo"
import { ArticleListPage } from "../../../components/shared/article-list-page"

export const metadata = buildMetadata({
  title: "AI-sammenligninger pa norsk",
  description:
    "Uavhengige sammenligninger av AI-verktoy og tjenester — slik at du velger riktig.",
  slug: "/sammenligninger",
})

export default function ComparisonsPage() {
  return (
    <ArticleListPage
      category="COMPARISON"
      title="AI-sammenligninger"
      description="Uavhengige sammenligninger av AI-verktoy — velg det riktige verktyet"
      breadcrumbLabel="Sammenligninger"
    />
  )
}
