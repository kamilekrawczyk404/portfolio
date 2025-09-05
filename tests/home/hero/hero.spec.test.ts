import { test } from "../../../playwright.config";
import { expect } from "@playwright/test";

test.describe("Hero", () => {
  let translations = {
    buttons: { myProjects: "", hireMe: "" },
    projects: {
      title: "",
    },
    contact: {
      title: "",
    },
  };

  test.beforeEach(async ({ page, i18nFixture: { t } }) => {
    await page.goto("/");

    translations = {
      buttons: {
        myProjects: t("HomePage.Hero.ActionButtons.ExploreMyWorks"),
        hireMe: t("HomePage.Hero.ActionButtons.HireMe"),
      },
      projects: {
        title: t("HomePage.ProjectsSection.Title"),
      },
      contact: {
        title: t("HomePage.Contact.Title"),
      },
    };
  });

  test("should render cta buttons", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: translations.buttons.myProjects }),
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: translations.buttons.myProjects }),
    ).toBeVisible();
  });

  test("should navigate to projects section after clicking 'My projects' button", async ({
    page,
  }) => {
    await page
      .getByRole("button", {
        name: translations.buttons.myProjects,
      })
      .click();

    await page.waitForTimeout(2000);

    // getting header by id (header contains multiple span elements)
    await expect(
      page.getByTestId(translations.projects.title),
    ).toBeInViewport();
  });

  test("should navigate to contact form after clicking 'Hire me' button", async ({
    page,
  }) => {
    await page
      .getByRole("button", {
        name: translations.buttons.hireMe,
      })
      .click();

    await page.waitForTimeout(2000);

    await expect(page.getByTestId(translations.contact.title)).toBeInViewport();
  });
});
