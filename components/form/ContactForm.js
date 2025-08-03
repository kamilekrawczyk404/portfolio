"use client";
import React, { useState } from "react";
import FormField from "@/components/form/FormField";
import { layoutProperties } from "@/layout";
import SubmitButton from "@/components/form/SubmitButton";
import axios from "axios";
import formField from "@/components/form/FormField";
import { useTranslations } from "next-intl";

const initialFormState = {
  name: {
    value: "",
    error: null,
    required: true,
    inputType: "input",
    type: "text",
  },
  email: {
    value: "",
    error: null,
    required: true,
    inputType: "input",
    type: "email",
  },
  phoneNumber: {
    value: "",
    error: null,
    required: false,
    inputType: "input",
    type: "tel",
  },
  subject: {
    value: "",
    error: null,
    required: true,
    inputType: "input",
    type: "text",
  },
  message: {
    value: "",
    error: null,
    required: true,
    inputType: "textarea",
    type: null,
  },
};

const ContactForm = ({ className = "" }) => {
  const t = useTranslations("HomePage.Contact.Form");

  const [formState, setFormState] = useState({
    isLoading: false,
    wasSuccessful: false,
  });

  const [formFields, setFormFields] = useState(initialFormState);

  const handleInputChange = (e, name) => {
    setFormFields((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: e.target.value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = Object.fromEntries(
      Object.entries(formFields).map(([key, values]) => [key, null]),
    );

    Object.entries(formFields).forEach(([key, values]) => {
      if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.value)) {
        errors[key] = "Email";
      }

      if (
        key === "phoneNumber" &&
        values.value.length > 0 &&
        !/^(?:\+48|0048)?\d{9}$/.test(values.value)
      ) {
        errors[key] = "PhoneNumber";
      }

      if (key !== "phoneNumber") {
        if (values.value.length === 0) {
          errors[key] = "Required";
        }
      }
    });

    setFormFields((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([key, values]) => {
          if (Object.keys(errors).includes(key)) {
            return [key, { ...values, error: errors[key] }];
          }
          return [key, values];
        }),
      ),
    );

    if (Object.values(errors).some((e) => e !== null)) return;

    setFormState((prev) => ({ ...prev, isLoading: true }));

    const resetForm = () => {
      setFormFields(initialFormState);

      setTimeout(() => {
        setFormState((prev) => ({ ...prev, wasSuccessful: false }));
      }, 2000);
    };

    await axios
      .post(
        "/api/send-email",
        Object.fromEntries(
          Object.entries(formFields).map(([key, values]) => [
            key,
            values.value,
          ]),
        ),
      )
      .then((res) => {
        if (res.config.timeout < 1000) {
          setTimeout(() => {
            setFormState({ isLoading: false, wasSuccessful: true });
            resetForm();
          }, 1000);
        } else {
          setFormState({ isLoading: false, wasSuccessful: true });
          resetForm();
        }
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit}>
        <div
          className={`grid md:grid-cols-2 grid-cols-1 ${layoutProperties.gap.medium}`}
        >
          {Object.entries(formFields).map(([key, values]) => (
            <FormField
              key={key}
              type={values.type}
              inputType={values.inputType}
              value={values.value}
              errorMessage={
                values.error !== null ? t(`Errors.${values.error}`) : ""
              }
              label={t(`Fields.${key}.Label`)}
              placeholder={t(`Fields.${key}.Placeholder`)}
              required={values.required}
              onChange={(e) => handleInputChange(e, key)}
              className={key === "message" ? "md:col-span-2" : ""}
            />
          ))}

          <SubmitButton
            submitText={t("Button.Submit")}
            successText={t("Button.Success")}
            className={"md:mt-0 mt-4"}
            isLoading={formState.isLoading}
            wasSuccessful={formState.wasSuccessful}
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
