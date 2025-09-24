import { test } from "../../../playwright.config";

test.describe("Images carousel", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should render images inside the carousel", async ({ page }) => {});
});
