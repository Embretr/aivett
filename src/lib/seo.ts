import type { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://aivett.no"
const siteName = "AIvett"
const defaultDescription =
  "Norges ledende plattform for AI-læring. Kurs, guider, nyheter og sammenligninger om kunstig intelligens på norsk."

export function buildMetadata({
  title,
  description = defaultDescription,
  slug = "",
  ogImage,
  type = "website",
  publishedTime,
  authors,
}: {
  title: string
  description?: string
  slug?: string
  ogImage?: string
  type?: "website" | "article"
  publishedTime?: string
  authors?: string[]
}): Metadata {
  const url = `${baseUrl}${slug}`
  const imageUrl = ogImage ?? `${baseUrl}/api/og?title=${encodeURIComponent(title)}`

  return {
    title: `${title} | ${siteName}`,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      siteName,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      locale: "nb_NO",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: [imageUrl],
    },
  }
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [],
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/kurs?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

export function courseJsonLd(course: {
  title: string
  description: string
  slug: string
  price: number
  isFree: boolean
  level: string
  instructor: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: `${baseUrl}/kurs/${course.slug}`,
    provider: {
      "@type": "Organization",
      name: siteName,
      sameAs: baseUrl,
    },
    instructor: {
      "@type": "Person",
      name: course.instructor,
    },
    offers: {
      "@type": "Offer",
      price: course.isFree ? "0" : (course.price / 100).toString(),
      priceCurrency: "NOK",
      availability: "https://schema.org/InStock",
    },
    educationalLevel: course.level,
    inLanguage: "nb",
  }
}

export function articleJsonLd(article: {
  title: string
  excerpt: string
  slug: string
  publishedAt: Date | null
  author: string
  ogImage?: string | null
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: `${baseUrl}/nyheter/${article.slug}`,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: `${baseUrl}/logo.png`,
    },
    datePublished: article.publishedAt?.toISOString(),
    image: article.ogImage ?? `${baseUrl}/api/og?title=${encodeURIComponent(article.title)}`,
    inLanguage: "nb",
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function faqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}
