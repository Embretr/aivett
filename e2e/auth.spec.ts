import { test, expect } from "@playwright/test"

const testEmail = `test-${Date.now()}@aivett-test.no`
const testPassword = "TestPassord123!"
const testName = "Test Bruker"

test.describe("Auth", () => {
  test("register a new user", async ({ page }) => {
    await page.goto("/registrer")
    await expect(page.getByRole("heading", { name: "Opprett konto" })).toBeVisible()

    await page.getByLabel("Navn").fill(testName)
    await page.getByLabel("E-post").fill(testEmail)
    await page.getByLabel("Passord").fill(testPassword)
    await page.getByRole("button", { name: "Opprett konto" }).click()

    await expect(page).toHaveURL("/profil")
  })

  test("login with existing account", async ({ page }) => {
    // Register first
    await page.goto("/registrer")
    const uniqueEmail = `login-test-${Date.now()}@aivett-test.no`
    await page.getByLabel("Navn").fill("Login Test")
    await page.getByLabel("E-post").fill(uniqueEmail)
    await page.getByLabel("Passord").fill(testPassword)
    await page.getByRole("button", { name: "Opprett konto" }).click()
    await expect(page).toHaveURL("/profil")

    // Logout
    await page.getByRole("button", { name: "Logg ut" }).click()
    await expect(page).toHaveURL("/")

    // Login
    await page.goto("/logg-inn")
    await page.getByLabel("E-post").fill(uniqueEmail)
    await page.getByLabel("Passord").fill(testPassword)
    await page.getByRole("button", { name: "Logg inn" }).click()
    await expect(page).toHaveURL("/profil")
  })

  test("redirect to login when accessing protected route", async ({ page }) => {
    await page.goto("/profil")
    await expect(page).toHaveURL(/\/logg-inn/)
    await expect(page.url()).toContain("redirect=/profil")
  })

  test("show validation errors for invalid email", async ({ page }) => {
    await page.goto("/logg-inn")
    await page.getByLabel("E-post").fill("not-an-email")
    await page.getByLabel("Passord").fill("password123")
    await page.getByRole("button", { name: "Logg inn" }).click()
    await expect(page.getByText("Ugyldig e-postadresse")).toBeVisible()
  })

  test("show validation error for short password", async ({ page }) => {
    await page.goto("/registrer")
    await page.getByLabel("Navn").fill("Test")
    await page.getByLabel("E-post").fill("test@test.no")
    await page.getByLabel("Passord").fill("short")
    await page.getByRole("button", { name: "Opprett konto" }).click()
    await expect(page.getByText(/minst 8 tegn/i)).toBeVisible()
  })
})
