export const dynamic = "force-dynamic"

import type { MetadataRoute } from "next"
import { db } from "../server/db"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://aivett.no"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, articles] = await Promise.all([
    db.course.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    }),
    db.article.findMany({
      where: { published: true },
      select: { slug: true, category: true, updatedAt: true },
    }),
  ])

  const categoryPaths: Record<string, string> = {
    NEWS: "nyheter",
    GUIDE: "guider",
    TUTORIAL: "veiledninger",
    COMPARISON: "sammenligninger",
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/kurs`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/nyheter`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.8 },
    { url: `${baseUrl}/guider`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/veiledninger`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/sammenligninger`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/priser`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/om`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ]

  const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${baseUrl}/kurs/${course.slug}`,
    lastModified: course.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/${categoryPaths[article.category] ?? "nyheter"}/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...courseRoutes, ...articleRoutes]
}
