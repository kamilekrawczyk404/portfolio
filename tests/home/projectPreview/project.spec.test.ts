import { test } from "../../../playwright.config";
import { expect, Page } from "@playwright/test";
import { Locator } from "playwright";

type Translations = {
  viewSwitcher: {
    galleryView: string;
    descriptionView: string;
    keyFeaturesView: string;
  };
};

test.describe("Project Preview", () => {
  let translations: Translations = {
    viewSwitcher: {
      galleryView: "",
      descriptionView: "",
      keyFeaturesView: "",
    },
  };

  test.beforeEach(async ({ page, i18nFixture: { t } }) => {
    await page.goto("/");
    const projectsSection = page.locator("#projects");
    await projectsSection.scrollIntoViewIfNeeded();
    await waitUntilProjectsAreLoaded(page);

    const translationPrefix = "HomePage.ProjectsSection.NavigationViewsHeaders";

    translations = {
      viewSwitcher: {
        galleryView: t(`${translationPrefix}.gallery`),
        descriptionView: t(`${translationPrefix}.description`),
        keyFeaturesView: t(`${translationPrefix}.keyFeatures`),
      },
    };
  });

  test("should render project preview modal when a project is clicked", async ({
    page,
  }) => {
    const modal = await getFirstProjectModal(page);

    await expect(modal).toBeVisible();
  });

  test("should close project preview modal when close button is clicked", async ({
    page,
  }) => {
    const modal = await getFirstProjectModal(page);

    await expect(modal).toBeVisible();

    await modal.getByTestId("close-button").click();

    await expect(modal).not.toBeVisible();
  });

  test("should display gallery view inside project preview modal at first", async ({
    page,
  }) => {
    const modal = await getFirstProjectModal(page);

    await expect(modal.getByTestId("gallery-view")).toBeVisible();
  });

  test("should display project photos gallery in the gallery view", async ({
    page,
  }) => {
    const modal = await getFirstProjectModal(page);

    const gallery = modal.getByTestId("gallery-container");
    await expect(gallery).toBeVisible();
  });

  test("should show the preview button on hover for every project card", async ({
    page,
  }) => {
    const projectPreviews = page.getByTestId("project-preview");
    const count = await projectPreviews.count();

    for (let i = 0; i < count; i++) {
      const projectCard = projectPreviews.nth(i);

      await projectCard.hover();

      const previewButton = projectCard.getByTestId("project-preview-button");

      await expect(previewButton).toBeVisible();
    }
  });

  test("should navigate to the first image after clicking next button on the last image", async ({
    page,
  }) => {
    await iterateOverProjectPreviews(
      page,
      async ({ projectCard, modal, closeButton }) => {
        const galleryNavigation = modal
          .getByTestId("gallery-container")
          .getByTestId("gallery-navigation");

        const photos = galleryNavigation.getByRole("img");
        const imagesCount = await photos.count();

        // Skip the test if there is only one image
        if (imagesCount === 1) {
          await closeButton.click();
          await expect(
            projectCard.getByTestId("expanded-project-preview"),
          ).not.toBeVisible();
          return;
        }

        const nextGalleryPhoto =
          galleryNavigation.getByTestId("next-gallery-photo");

        for (let j = 0; j < imagesCount - 1; j++) {
          await nextGalleryPhoto.click();
        }

        // Verify that we are on the last image
        await expect(photos.nth(imagesCount - 1)).toBeVisible();
        await nextGalleryPhoto.click();
        await expect(photos.first()).toBeVisible();

        await closeButton.click();
        await expect(modal).not.toBeVisible();
      },
    );
  });

  test("should navigate to selected image after clicking an image located in the navigation section", async ({
    page,
  }) => {
    const selectedIndex = 1;

    await iterateOverProjectPreviews(page, async ({ modal, closeButton }) => {
      const gallery = modal.getByTestId("gallery-container");
      const navigationSection = gallery.getByTestId("gallery-navigation");

      const images = navigationSection.getByTestId("gallery-navigation-image");
      const imagesCount = await images.count();

      if (imagesCount <= selectedIndex) {
        await closeButton.click();
        await expect(modal).not.toBeVisible();
        return;
      }

      const galleryMainPhoto = gallery.getByTestId("gallery-main-photo");
      const selectedImage = images.nth(selectedIndex);
      await selectedImage.click();

      // Wait until the main photo updates its src attribute
      await page.waitForTimeout(500);

      // Get the full src attributes from both the main photo and the indicator image
      const mainPhotoSrc = await galleryMainPhoto
        .getByRole("img")
        .getAttribute("src");
      const selectedPhotoSrc = await selectedImage
        .getByRole("img")
        .getAttribute("src");

      // Use the URL object to compare only the pathname, ignoring query parameters like ?quality=...
      const mainPhotoUrl = getImageUrl(mainPhotoSrc);
      const selectedPhotoUrl = getImageUrl(selectedPhotoSrc);

      expect(mainPhotoUrl).toBe(selectedPhotoUrl);
      await closeButton.click();
      await expect(modal).not.toBeVisible();
    });
  });

  test('should display project description after clicking "Description" button', async ({
    page,
  }) => {
    const modal = await getFirstProjectModal(page);

    await modal
      .getByRole("button", { name: translations.viewSwitcher.descriptionView })
      .click();

    await page.waitForTimeout(1000);

    await expect(modal.getByTestId("project-description-view")).toBeVisible();
  });

  test('should display project key features after clicking "Key features" button', async ({
    page,
  }) => {
    const modal = await getFirstProjectModal(page);

    await modal
      .getByRole("button", { name: translations.viewSwitcher.keyFeaturesView })
      .click();

    await page.waitForTimeout(1000);

    await expect(modal.getByTestId("key-features-view")).toBeVisible();
  });

  const getImageUrl = (nextImageSrc: string | null) => {
    if (!nextImageSrc) return null;

    return nextImageSrc.substring(
      nextImageSrc.indexOf("url=") + 4,
      nextImageSrc.indexOf("&", nextImageSrc.indexOf("url=")),
    );
  };

  const iterateOverProjectPreviews = async (
    page: Page,
    callback: ({
      projectCard,
      closeButton,
      modal,
    }: {
      projectCard: Locator;
      closeButton: Locator;
      modal: Locator;
    }) => Promise<void>,
  ) => {
    const projectPreviews = page.getByTestId("project-preview");
    const count = await projectPreviews.count();

    for (let i = 0; i < count; i++) {
      // Getting all necessary locators
      const projectCard = projectPreviews.nth(i);
      const closeButton = projectCard.getByTestId("close-button");

      // Open project preview modal
      await projectCard.hover();
      const previewButton = projectCard.getByTestId("project-preview-button");
      await previewButton.click();

      // Get appeared modal
      const modal = projectCard.getByTestId("expanded-project-preview");
      await expect(modal).toBeVisible();

      await callback({ projectCard, modal, closeButton });
    }
  };

  const getFirstProjectModal = async (page: Page): Promise<Locator> => {
    await clickProjectPreview(page);

    return page
      .getByTestId("project-preview")
      .getByTestId("expanded-project-preview");
  };

  const clickProjectPreview = async (page: Page | Locator) => {
    const projectPreview = page.getByTestId("project-preview");
    await projectPreview.first().hover({ timeout: 1000 });
    await projectPreview.getByTestId("project-preview-button").click();
  };

  const waitUntilProjectsAreLoaded = async (page: Page) => {
    await page.waitForSelector('[data-testid="project-preview"]', {
      state: "visible",
      timeout: 10000,
    });
    await expect(page.getByTestId("project-preview").first()).toBeVisible();
  };
});
