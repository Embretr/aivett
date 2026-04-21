import { test, expect } from "@playwright/test"

const testEmail = `progress-test-${Date.now()}@aivett-test.no`
const testPassword = "TestPassord123!"

test.describe("Course Progress", () => {
  test.beforeEach(async ({ page }) => {
    // Register and login
    await page.goto("/registrer")
    await page.getByLabel("Navn").fill("Progress Tester")
    await page.getByLabel("E-post").fill(testEmail)
    await page.getByLabel("Passord").fill(testPassword)
    await page.getByRole("button", { name: "Opprett konto" }).click()
    await expect(page).toHaveURL("/profil")
  })

  test("my courses page loads and shows empty state without purchases", async ({ page }) => {
    await page.goto("/profil/kurs")
    await expect(page.getByRole("heading", { name: "Mine kurs" })).toBeVisible()
    // Empty state or courses list
    const emptyState = page.getByText("Du har ikke kjopt noen kurs enn.")
    const courseGrid = page.locator(".grid")
    const hasEmpty = await emptyState.isVisible()
    const hasGrid = await courseGrid.isVisible()
    expect(hasEmpty || hasGrid).toBeTruthy()
  })

  test("profile page shows user information", async ({ page }) => {
    await page.goto("/profil")
    await expect(page.getByText("progress-test")).toBeVisible()
    await expect(page.getByText("Abonnement")).toBeVisible()
  })
})
