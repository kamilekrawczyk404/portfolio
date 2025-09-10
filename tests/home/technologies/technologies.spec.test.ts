import { test } from "../../../playwright.config";
import { expect } from "@playwright/test";

type FrontendProps = {
  languages: string;
  frameworks: string;
  additionalAspects: string;
};

type BackendProps = FrontendProps;

type DevToolsProps = {
  tools: string;
  projectManagement: string;
  additionalAspects: string;
};

type Translations = {
  title: string;
  frontend: FrontendProps;
  backend: BackendProps;
  devTools: DevToolsProps;
};

test.describe("Technologies", () => {
  let translations: Translations = {
    title: "",
    frontend: {
      languages: "",
      frameworks: "",
      additionalAspects: "",
    },
    backend: {
      languages: "",
      frameworks: "",
      additionalAspects: "",
    },
    devTools: {
      tools: "",
      projectManagement: "",
      additionalAspects: "",
    },
  };

  test.beforeEach(async ({ page, i18nFixture: { t } }) => {
    await page.goto("/");

    const technologiesSection = page.locator("#technologies");

    await technologiesSection.scrollIntoViewIfNeeded();

    await page.waitForTimeout(1000);

    const translationsPrefix = "HomePage.Technologies";

    translations = {
      title: t(`${translationsPrefix}.Title`),
      frontend: {
        languages: t(`${translationsPrefix}.Frontend.Sections.Languages`),
        frameworks: t(
          `${translationsPrefix}.Frontend.Sections.Frameworks & Libraries`,
        ),
        additionalAspects: t(
          `${translationsPrefix}.Frontend.Sections.Additional aspects`,
        ),
      },
      backend: {
        languages: t(`${translationsPrefix}.Backend.Sections.Languages`),
        frameworks: t(
          `${translationsPrefix}.Backend.Sections.Frameworks & Libraries`,
        ),
        additionalAspects: t(
          `${translationsPrefix}.Backend.Sections.Additional aspects`,
        ),
      },
      devTools: {
        tools: t(`${translationsPrefix}.DevTools.Sections.Tools`),
        projectManagement: t(
          `${translationsPrefix}.DevTools.Sections.Project management`,
        ),
        additionalAspects: t(
          `${translationsPrefix}.DevTools.Sections.Additional aspects`,
        ),
      },
    };
  });

  test("should render frontend subtitles", async ({ page }) => {
    const technologiesSection = page.locator("#technologies");

    for (const [_, translation] of Object.entries(translations.frontend)) {
      const header = technologiesSection.getByRole("heading", {
        name: translation,
      });

      await expect(header).toBeVisible();
    }
  });

  test("should navigate to the backend category", async ({ page }) => {
    const technologiesSection = page.locator("#technologies");

    const backendCategoryButton = technologiesSection.getByRole("button", {
      name: /backend/i,
    });

    await expect(backendCategoryButton).toBeVisible();
    await backendCategoryButton.click();
    await page.waitForTimeout(500);

    for (const [_, translation] of Object.entries(translations.backend)) {
      const header = technologiesSection.getByRole("heading", {
        name: translation,
      });

      await expect(header).toBeVisible();
    }
  });

  test("should navigate to the dev tools category", async ({ page }) => {
    const technologiesSection = page.locator("#technologies");

    const devToolsCategoryButton = technologiesSection.getByRole("button", {
      name: /devtools/i,
    });

    await expect(devToolsCategoryButton).toBeVisible();
    await devToolsCategoryButton.click();
    await page.waitForTimeout(500);

    for (const [_, translation] of Object.entries(translations.devTools)) {
      const header = technologiesSection.getByRole("heading", {
        name: translation,
      });

      await expect(header).toBeVisible();
    }
  });
});
