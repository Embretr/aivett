import { test, expect } from "@playwright/test"

test.describe("Articles", () => {
  test("news listing page loads", async ({ page }) => {
    await page.goto("/nyheter")
    await expect(page.getByRole("heading", { name: "AI-nyheter" })).toBeVisible()
  })

  test("guides listing page loads", async ({ page }) => {
    await page.goto("/guider")
    await expect(page.getByRole("heading", { name: "AI-guider" })).toBeVisible()
  })

  test("tutorials listing page loads", async ({ page }) => {
    await page.goto("/veiledninger")
    await expect(page.getByRole("heading", { name: "AI-veiledninger" })).toBeVisible()
  })

  test("comparisons listing page loads", async ({ page }) => {
    await page.goto("/sammenligninger")
    await expect(page.getByRole("heading", { name: "AI-sammenligninger" })).toBeVisible()
  })

  test("news article has article schema when published", async ({ page }) => {
    await page.goto("/nyheter")
    const firstArticleLink = page.locator("a[href^='/nyheter/']").first()
    const exists = await firstArticleLink.count()
    if (exists === 0) return // No articles yet

    await firstArticleLink.click()

    const jsonLd = page.locator('script[type="application/ld+json"]')
    const count = await jsonLd.count()
    let hasArticleSchema = false
    for (let i = 0; i < count; i++) {
      const content = await jsonLd.nth(i).textContent()
      if (content?.includes('"Article"')) {
        hasArticleSchema = true
        break
      }
    }
    expect(hasArticleSchema).toBe(true)
  })
})
