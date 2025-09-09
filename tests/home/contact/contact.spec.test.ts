import { test } from "../../../playwright.config";
import { expect } from "@playwright/test";

type InputName = "name" | "phoneNumber" | "subject" | "email" | "message";

type FormInputs = { [p in InputName]: { label: string; placeholder: string } };

test.describe("Contact", () => {
  let formInputs: FormInputs = {
    name: { label: "", placeholder: "" },
    phoneNumber: { label: "", placeholder: "" },
    subject: { label: "", placeholder: "" },
    email: { label: "", placeholder: "" },
    message: { label: "", placeholder: "" },
  };

  test.beforeEach(async ({ page, i18nFixture: { t } }) => {
    await page.goto("/");

    const translationPrefix = "HomePage.Contact.Form.Fields";

    // Correct and simplified mapping logic
    formInputs = Object.fromEntries(
      Object.keys(formInputs).map((field: InputName) => {
        const label = t(`${translationPrefix}.${field}.Label`);
        const placeholder = t(`${translationPrefix}.${field}.Placeholder`);

        return [field, { label, placeholder }];
      }),
    ) as FormInputs;
  });

  test.describe("Contact form", () => {
    test("should have correct labels and placeholders", async ({ page }) => {
      const contactSection = page.locator("#contact");

      await contactSection.scrollIntoViewIfNeeded();

      await page.waitForTimeout(1000);

      for (const field of Object.values(formInputs)) {
        await expect(page.getByLabel(field.label)).toBeVisible();
        await expect(page.getByPlaceholder(field.placeholder)).toBeVisible();
      }
    });
  });
});
