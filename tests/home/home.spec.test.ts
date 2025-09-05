import { test } from "../../playwright.config";
import { expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should have proper title", async ({ page, i18nFixture: { t } }) => {
    await page.goto("/");

    const title = t("metadata.title");

    await expect(page).toHaveTitle(title);
  });
});
