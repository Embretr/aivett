import { test, expect } from "@playwright/test"

test.describe("SEO", () => {
  test("homepage has correct lang attribute", async ({ page }) => {
    await page.goto("/")
    const html = page.locator("html")
    await expect(html).toHaveAttribute("lang", "nb")
  })

  test("homepage has title and description meta", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/AIvett/)
    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute("content", /.+/)
  })

  test("homepage has JSON-LD WebSite schema", async ({ page }) => {
    await page.goto("/")
    const jsonLd = page.locator('script[type="application/ld+json"]').first()
    const content = await jsonLd.textContent()
    const data = JSON.parse(content ?? "{}")
    expect(data["@type"]).toBe("WebSite")
  })

  test("sitemap.xml is accessible and valid", async ({ page }) => {
    const response = await page.goto("/sitemap.xml")
    expect(response?.status()).toBe(200)
    const content = await page.content()
    expect(content).toContain("urlset")
    expect(content).toContain("aivett.no")
  })

  test("robots.txt is accessible", async ({ page }) => {
    const response = await page.goto("/robots.txt")
    expect(response?.status()).toBe(200)
    const content = await page.content()
    expect(content).toContain("sitemap")
  })

  test("courses page has correct title", async ({ page }) => {
    await page.goto("/kurs")
    await expect(page).toHaveTitle(/AI-kurs pa norsk.*AIvett/i)
  })

  test("pricing page has canonical URL", async ({ page }) => {
    await page.goto("/priser")
    const canonical = page.locator('link[rel="canonical"]')
    const href = await canonical.getAttribute("href")
    expect(href).toContain("/priser")
  })

  test("OG image endpoint returns 200", async ({ page }) => {
    const response = await page.goto("/api/og?title=Test+Tittel")
    expect(response?.status()).toBe(200)
    expect(response?.headers()["content-type"]).toContain("image")
  })

  test("404 page renders correctly", async ({ page }) => {
    const response = await page.goto("/denne-siden-finnes-ikke")
    expect(response?.status()).toBe(404)
    await expect(page.getByText("404")).toBeVisible()
  })
})
