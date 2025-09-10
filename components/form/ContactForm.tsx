"use client";
import React, { ComponentProps, useCallback } from "react";
import { layoutProperties } from "@/layout";
import SubmitButton from "@/components/form/SubmitButton";
import axios from "axios";
import { useTranslations } from "next-intl";
import Form, { FormFieldsProperties } from "@/components/form/Form";
import { useFormState } from "@/hooks/useFormState";

type ContactFormFields = {
  name: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
};

const fields: FormFieldsProperties<ContactFormFields> = {
  name: {
    value: "",
    validation: {
      required: true,
    },
  },
  email: {
    value: "",
    validation: {
      required: true,
      custom: {
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        i18nValue: "HomePage.Contact.Form.Errors.Email",
      },
    },
  },
  phoneNumber: {
    value: "",
    validation: {
      custom: {
        validate: (value: string) => /^(?:\+48|0048)?\d{9}$/.test(value),
        i18nValue: "HomePage.Contact.Form.Errors.PhoneNumber",
      },
    },
  },
  subject: {
    value: "",
    validation: {
      required: true,
    },
  },
  message: {
    value: "",
    validation: {
      required: true,
    },
  },
};

const ContactForm = ({
  className = "",
}: Pick<ComponentProps<"form">, "className">) => {
  const t = useTranslations("HomePage.Contact.Form");

  const { submit, onSuccess, onError, isPending, isSuccess } = useFormState();

  const handleSubmit = useCallback((values: ContactFormFields) => {
    submit(
      async () =>
        await axios
          .post("/api/send-email", values)
          .then((res) => {
            if (res.config.timeout < 1000) {
              setTimeout(() => {
                onSuccess();
              }, 2000);
            } else {
              onSuccess();
            }
          })
          .catch((err) => onError(err)),
    );
  }, []);

  return (
    <div className={`${className}`}>
      <Form
        id={"contact-form"}
        fields={fields}
        onSubmit={handleSubmit}
        className={`grid md:grid-cols-2 grid-cols-1 ${layoutProperties.gap.medium}`}
      >
        <Form.Input
          name={"name"}
          label={t("Fields.name.Label")}
          placeholder={t("Fields.name.Placeholder")}
        />
        <Form.Input
          name={"email"}
          label={t("Fields.email.Label")}
          placeholder={t("Fields.email.Placeholder")}
        />
        <Form.Input
          name={"phoneNumber"}
          label={t("Fields.phoneNumber.Label")}
          placeholder={t("Fields.phoneNumber.Placeholder")}
        />
        <Form.Input
          name={"subject"}
          label={t("Fields.subject.Label")}
          placeholder={t("Fields.subject.Placeholder")}
        />
        <Form.Textarea
          name={"message"}
          label={t("Fields.message.Label")}
          placeholder={t("Fields.message.Placeholder")}
          className={"md:col-span-2"}
        />

        <SubmitButton
          submitText={t("Button.Submit")}
          successText={t("Button.Success")}
          className={"md:mt-0 mt-4"}
          isLoading={isPending}
          wasSuccessful={isSuccess}
        />
      </Form>
    </div>
  );
};

export default ContactForm;
