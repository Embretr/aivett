export const dynamic = "force-dynamic"

import { buildMetadata } from "../../../lib/seo"
import { ArticleListPage } from "../../../components/shared/article-list-page"

export const metadata = buildMetadata({
  title: "AI-sammenligninger på norsk",
  description:
    "Uavhengige sammenligninger av AI-verktøy og tjenester — slik at du velger riktig.",
  slug: "/sammenligninger",
})

export default function ComparisonsPage() {
  return (
    <ArticleListPage
      category="COMPARISON"
      title="AI-sammenligninger"
      description="Uavhengige sammenligninger av AI-verktøy — velg det riktige verktøyet"
      breadcrumbLabel="Sammenligninger"
    />
  )
}
