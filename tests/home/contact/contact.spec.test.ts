import { test } from "../../../playwright.config";
import { expect } from "@playwright/test";
import { Locator } from "playwright";

type InputName = "name" | "phoneNumber" | "subject" | "email" | "message";

type FormInputs = { [p in InputName]: { label: string; placeholder: string } };

const ANIMATION_TIMEOUT = 500;

test.describe("Contact", () => {
  type RequiredField = Exclude<InputName, "phoneNumber">;

  const requiredFields: RequiredField[] = [
    "name",
    "email",
    "subject",
    "message",
  ];

  let formInputs: FormInputs = {
    name: { label: "", placeholder: "" },
    phoneNumber: { label: "", placeholder: "" },
    subject: { label: "", placeholder: "" },
    email: { label: "", placeholder: "" },
    message: { label: "", placeholder: "" },
  };

  test.beforeEach(async ({ page, i18nFixture: { t } }) => {
    await page.goto("/");

    // get contact section
    const contactSection = page.locator("#contact");

    // scroll to the section
    await contactSection.scrollIntoViewIfNeeded();

    // wait until form will be visible
    await page.waitForTimeout(1000);

    const translationPrefix = "HomePage.Contact.Form.Fields";

    // correct and simplified mapping logic
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
      for (const field of Object.values(formInputs)) {
        await expect(page.getByLabel(field.label)).toBeVisible();
        await expect(page.getByPlaceholder(field.placeholder)).toBeVisible();
      }
    });

    test("should validate fields after clicking submit button", async ({
      page,
    }) => {
      const form = page.locator("#contact-form");

      const submitButton = form.getByRole("button");
      await submitButton.click();

      // errors are animated
      await page.waitForTimeout(ANIMATION_TIMEOUT);

      const errorIds = [
        "name-error-label",
        "email-error-label",
        "subject-error-label",
        "message-error-label",
      ];

      for (const errorId of errorIds) {
        const label = form.getByTestId(errorId);

        await expect(label).toBeVisible();
        await expect(label).toHaveText(/(required|wymagan)/i);
      }
    });

    test("should validate phone number", async ({ page }) => {
      const form = page.locator("#contact-form");
      const submitButton = form.getByRole("button");
      const phoneNumberField = form.getByPlaceholder(
        formInputs.phoneNumber.placeholder,
      );
      // correct format is ^\d{9}$
      await phoneNumberField.fill("123");
      await submitButton.click();
      await page.waitForTimeout(ANIMATION_TIMEOUT);

      await expect(form.getByTestId("phoneNumber-error-label")).toBeVisible();
    });

    test("should validate email address", async ({ page }) => {
      const form = page.locator("#contact-form");
      const submitButton = form.getByRole("button");
      const emailField = form.getByPlaceholder(formInputs.email.placeholder);

      await emailField.fill("wrong input");
      await submitButton.click();
      await page.waitForTimeout(ANIMATION_TIMEOUT);

      await expect(form.getByTestId("email-error-label")).toBeVisible();
    });

    test("should submit the form successfully even with an empty phone number, then reset fields", async ({
      page,
    }) => {
      const form = page.locator("#contact-form");
      const submitButton = form.getByRole("button");

      await fillFormFields(form, requiredFields);

      await submitButton.click();

      await expect(submitButton).toHaveText(/(success|wysłano)/i);

      for (const field of requiredFields) {
        const element = form.getByPlaceholder(formInputs[field].placeholder);

        await expect(element).toHaveValue("");
      }
    });

    test("should change button status while submitting", async ({ page }) => {
      const form = page.locator("#contact-form");
      const submitButton = form.getByRole("button");

      await fillFormFields(form, requiredFields);

      await submitButton.click();

      // loading status
      await expect(submitButton).toHaveText("");

      // success status
      await expect(submitButton).toHaveText(/(success|wysłano)/i);
    });

    const fillFormFields = async (form: Locator, fields: RequiredField[]) => {
      for (const field of fields) {
        const element = form.getByPlaceholder(formInputs[field].placeholder);

        switch (field) {
          case "name":
            await element.fill("John");
            break;
          case "email":
            await element.fill("john@gmail.com");
            break;
          case "subject":
            await element.fill("Testing subject");
            break;
          case "message":
            await element.fill("Testing message");
            break;
          default:
            break;
        }
      }
    };
  });
});
