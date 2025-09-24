import { defineConfig, devices, test as base } from "@playwright/test";
import { locales } from "@/i18n/routing";
import { createI18nFixture } from "playwright-i18next-fixture";
import i18nEn from "messages/en.json";
import i18nPl from "messages/pl.json";
import { i18n } from "i18next";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const i18nFixture = createI18nFixture({
  options: {
    debug: false,
    supportedLngs: ["en", "pl"],
    cleanCode: true,
    resources: {
      en: {
        translation: i18nEn,
      },
      pl: {
        translation: i18nPl,
      },
    },
  },
  cache: true,
  auto: true,
});

export const test = base.extend(i18nFixture).extend<{ i18nFixture: i18n }>({
  i18nFixture: async ({ i18n, locale }, use) => {
    if (locale.includes("en")) {
      await i18n.changeLanguage("en");
      await use(i18n);
    } else {
      await i18n.changeLanguage("pl");
      await use(i18n);
    }
  },
});

export default defineConfig({
  timeout: 60000,
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:3000",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    ...locales.map((locale) => ({
      name: `chrome ${locale}`,
      use: {
        ...devices["Desktop Chrome"],
        i18n: locale,
      },
    })),

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
