import { test } from "../../../playwright.config";
import { expect, Page } from "@playwright/test";
import { projectsList } from "@/projectsList";
import { CachedProjectsData } from "@/hooks/useCachedGithubRepos";
import { GithubRepo } from "@/types/types";
import { Regex } from "lucide-react";
import { Locator } from "playwright";
import { sort } from "next/dist/build/webpack/loaders/css-loader/src/utils";

test.describe("Projects", () => {
  type Translations = {
    loading: string;
    title: string;
    refreshButton: string;
    sorting: {
      creationDateDesc: string;
      creationDateAsc: string;
      updatedDesc: string;
      updatedAsc: string;
    };
    projectsTitles: { [key in string]: string };
  };

  let translations: Translations = {
    loading: "",
    title: "",
    refreshButton: "",
    sorting: {
      creationDateDesc: "",
      creationDateAsc: "",
      updatedDesc: "",
      updatedAsc: "",
    },
    projectsTitles: projectsList
      .map((p) => p.githubRepoName)
      .reduce(
        (acc, name) => {
          acc[name] = name;
          return acc;
        },
        {} as { [key in string]: string },
      ),
  };

  test.beforeEach(async ({ page, i18nFixture: { t } }) => {
    await page.goto("/");

    translations = {
      loading: t("HomePage.ProjectsSection.Loading"),
      title: t("HomePage.ProjectsSection.Title"),
      refreshButton: t("HomePage.ProjectsSection.RefreshButton"),
      sorting: {
        creationDateDesc: t(
          "HomePage.ProjectsSection.Sorting.Values.CreatedDesc",
        ),
        creationDateAsc: t(
          "HomePage.ProjectsSection.Sorting.Values.CreatedAsc",
        ),
        updatedDesc: t("HomePage.ProjectsSection.Sorting.Values.UpdatedDesc"),
        updatedAsc: t("HomePage.ProjectsSection.Sorting.Values.UpdatedAsc"),
      },
      projectsTitles: projectsList
        .map((p) => p.githubRepoName)
        .reduce(
          (acc, name) => {
            acc[name] = t(`HomePage.ProjectsSection.Projects.${name}.Title`);
            return acc;
          },
          {} as { [key in string]: string },
        ),
    };

    const projectSection = page.getByTestId(translations.title);
    await projectSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
  });

  test("should render projects section", async ({ page }) => {
    await expect(page.getByTestId(translations.title)).toBeVisible();
  });

  test("should load and display projects", async ({ page }) => {
    // Wait until the loading indicator disappears
    await waitUntilProjectsAreLoaded(page);

    // Now check for the presence of project preview items
    const projectPreviewItems = page.getByTestId("project-preview");
    await expect(projectPreviewItems.first()).toBeVisible();

    // Verify that the number of loaded projects matches the expected count
    const assumedProjectsCount = projectsList.length;
    await expect(projectPreviewItems).toHaveCount(assumedProjectsCount);
  });

  test("should save projects to cache", async ({ page }) => {
    // Wait until the loading indicator disappears
    await waitUntilProjectsAreLoaded(page);

    // Check local storage for cached projects
    const cachedData = await page.evaluate(() => {
      return localStorage.getItem("githubReposCache");
    });

    expect(cachedData).not.toBeNull();

    if (cachedData) {
      const parsedCache = JSON.parse(cachedData);
      const data: CachedProjectsData = parsedCache.data;

      expect(data.repositories.length).toBe(projectsList.length);
    }
  });

  test("should sort projects by creation date descending", async ({ page }) => {
    // Wait until the loading indicator disappears
    await waitUntilProjectsAreLoaded(page);

    // Get the sort selector and change sorting to "Creation Date (Newest)"
    const sortSelector = getSortSelector(page);
    await selectSelectorItem(
      sortSelector,
      translations.sorting.creationDateDesc,
    );

    const sortByCreatedDesc = (a: GithubRepo, b: GithubRepo) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

    await checkProjectsOrder(sortSelector, sortByCreatedDesc, page);
  });

  test("should sort projects by creation date ascending", async ({ page }) => {
    // Wait until the loading indicator disappears
    await waitUntilProjectsAreLoaded(page);

    // Get the sort selector and change sorting to "Creation Date (Oldest)"
    const sortSelector = getSortSelector(page);
    await selectSelectorItem(
      sortSelector,
      translations.sorting.creationDateAsc,
    );

    const sortByCreatedAsc = (a: GithubRepo, b: GithubRepo) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

    await checkProjectsOrder(sortSelector, sortByCreatedAsc, page);
  });

  test("should sort projects by update date descending", async ({ page }) => {
    // Wait until the loading indicator disappears
    await waitUntilProjectsAreLoaded(page);

    // Get the sort selector and change sorting to "Modification Date (Newest)"
    const sortSelector = getSortSelector(page);
    await selectSelectorItem(sortSelector, translations.sorting.updatedDesc);

    const sortByUpdatedDesc = (a: GithubRepo, b: GithubRepo) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();

    await checkProjectsOrder(sortSelector, sortByUpdatedDesc, page);
  });

  test("should sort projects by update date ascending", async ({ page }) => {
    // Wait until the loading indicator disappears
    await waitUntilProjectsAreLoaded(page);

    // Get the sort selector and change sorting to "Modification Date (Oldest)"
    const sortSelector = getSortSelector(page);
    await selectSelectorItem(sortSelector, translations.sorting.updatedAsc);

    const sortByUpdatedAsc = (a: GithubRepo, b: GithubRepo) =>
      new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();

    await checkProjectsOrder(sortSelector, sortByUpdatedAsc, page);
  });

  const checkProjectsOrder = async (
    sortSelector: Locator,
    sortingAlgorithm: (a: GithubRepo, b: GithubRepo) => number,
    page: Page,
  ) => {
    const firstProject = page.getByTestId("project-preview").first();

    // Get cached projects to determine the expected first project
    const cachedProjects = await getCachedProjects(page);
    if (!cachedProjects) throw new Error("No cached projects found");

    // Sort cached projects by creation date descending
    const expectedFirstProject = cachedProjects.sort(sortingAlgorithm)[0];

    // Verify that the first displayed project matches the expected first project's title
    await expect(firstProject).toContainText(
      translations.projectsTitles[expectedFirstProject.name],
    );

    // Verify, that selector has correct selected value
    await expect(sortSelector).toContainText(
      translations.sorting.creationDateDesc,
    );
  };

  const selectSelectorItem = async (
    selector: Locator,
    selectorItemText: string,
  ) => {
    await selector.click();

    const selectorCreatedDescOption = selector
      .getByText(selectorItemText)
      .first();

    await selectorCreatedDescOption.waitFor({ state: "visible" });
    await selectorCreatedDescOption.click();
  };

  const getLoadingIndicator = (page: Page) =>
    page.getByText(translations.loading);

  const waitUntilProjectsAreLoaded = async (page: Page) => {
    const loadingIndicator = getLoadingIndicator(page);

    if (await loadingIndicator.isVisible()) {
      await loadingIndicator.waitFor({ state: "detached", timeout: 10000 });
    }
  };

  const getSortSelector = (page: Page) =>
    page.getByTestId("projects-sorting-selector");
});

export const getCachedProjects = async (
  page: Page,
): Promise<GithubRepo[] | null> => {
  const cachedData = await page.evaluate(() => {
    return localStorage.getItem("githubReposCache");
  });

  if (cachedData) {
    const parsedCache = JSON.parse(cachedData);
    return (parsedCache.data as CachedProjectsData).repositories;
  }
  return null;
};
