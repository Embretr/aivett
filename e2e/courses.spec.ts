import { test, expect } from "@playwright/test"

test.describe("Courses", () => {
  test("courses listing page loads", async ({ page }) => {
    await page.goto("/kurs")
    await expect(page.getByRole("heading", { name: "AI-kurs pa norsk" })).toBeVisible()
    await expect(page.getByText(/kurs tilgjengelig/)).toBeVisible()
  })

  test("navbar has link to courses", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("link", { name: "Kurs" })).toBeVisible()
  })

  test("free preview lesson redirects to login if not authenticated", async ({ page }) => {
    // Without being logged in, accessing a lesson should redirect
    await page.goto("/kurs/test-kurs/leksjoner/introduksjon")
    await expect(page).toHaveURL(/\/logg-inn/)
  })

  test("course detail page shows buy button for unauthenticated users", async ({ page }) => {
    await page.goto("/kurs")
    // Only test if there are courses
    const firstCourseLink = page.locator("a[href^='/kurs/']").first()
    const exists = await firstCourseLink.count()
    if (exists === 0) return // No courses yet

    await firstCourseLink.click()
    // Either shows "Start gratis kurs" or "Kjop tilgang"
    const ctaButton = page.getByRole("button", { name: /kjop|start gratis/i })
    await expect(ctaButton).toBeVisible()
  })
})
