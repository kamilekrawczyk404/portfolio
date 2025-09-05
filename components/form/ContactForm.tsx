"use client";
import React, { useCallback, useState } from "react";
import FormField from "@/components/form/FormField";
import { layoutProperties } from "@/layout";
import SubmitButton from "@/components/form/SubmitButton";
import axios from "axios";
import formField from "@/components/form/FormField";
import { useTranslations } from "next-intl";
import Form, { FormFieldsProperties } from "@/components/form/Form";

const initialFormState = {
  name: {
    id: "userName",
    value: "",
    error: null,
    required: true,
    inputType: "input",
    type: "text",
  },
  email: {
    id: "userEmail",
    value: "",
    error: null,
    required: true,
    inputType: "input",
    type: "email",
  },
  phoneNumber: {
    id: "userPhone",
    value: "",
    error: null,
    required: false,
    inputType: "input",
    type: "tel",
  },
  subject: {
    id: "userSubject",
    value: "",
    error: null,
    required: true,
    inputType: "input",
    type: "text",
  },
  message: {
    id: "userMessage",
    value: "",
    error: null,
    required: true,
    inputType: "textarea",
    type: null,
  },
};

type ContactFormFields = { name: string; email: string };

const fields: FormFieldsProperties<ContactFormFields> = {
  name: {
    placeholder: "Enter your name",
    label: "Your name",
    value: "",
    validation: {
      required: true,
    },
  },
  email: {
    placeholder: "Enter your email",
    label: "Your email",
    value: "",
    validation: {
      required: true,
    },
  },
};

const ContactForm = ({ className = "" }) => {
  const t = useTranslations("HomePage.Contact.Form");

  // const [formState, setFormState] = useState({
  //   isLoading: false,
  //   wasSuccessful: false,
  // });
  //
  // const [formFields, setFormFields] = useState(initialFormState);
  //
  // const handleInputChange = (e, name) => {
  //   setFormFields((prev) => ({
  //     ...prev,
  //     [name]: {
  //       ...prev[name],
  //       value: e.target.value,
  //     },
  //   }));
  // };
  //
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //
  //   const errors = Object.fromEntries(
  //     Object.entries(formFields).map(([key, values]) => [key, null]),
  //   );
  //
  //   Object.entries(formFields).forEach(([key, values]) => {
  //     if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.value)) {
  //       errors[key] = "Email";
  //     }
  //
  //     if (
  //       key === "phoneNumber" &&
  //       values.value.length > 0 &&
  //       !/^(?:\+48|0048)?\d{9}$/.test(values.value)
  //     ) {
  //       errors[key] = "PhoneNumber";
  //     }
  //
  //     if (key !== "phoneNumber") {
  //       if (values.value.length === 0) {
  //         errors[key] = "Required";
  //       }
  //     }
  //   });
  //
  //   setFormFields((prev) =>
  //     Object.fromEntries(
  //       Object.entries(prev).map(([key, values]) => {
  //         if (Object.keys(errors).includes(key)) {
  //           return [key, { ...values, error: errors[key] }];
  //         }
  //         return [key, values];
  //       }),
  //     ),
  //   );
  //
  //   if (Object.values(errors).some((e) => e !== null)) return;
  //
  //   setFormState((prev) => ({ ...prev, isLoading: true }));
  //
  //   await axios
  //     .post(
  //       "/api/send-email",
  //       Object.fromEntries(
  //         Object.entries(formFields).map(([key, values]) => [
  //           key,
  //           values.value,
  //         ]),
  //       ),
  //     )
  //     .then((res) => {
  //       if (res.config.timeout < 1000) {
  //         setTimeout(() => {
  //           setFormState({ isLoading: false, wasSuccessful: true });
  //           resetForm();
  //         }, 1000);
  //       } else {
  //         setFormState({ isLoading: false, wasSuccessful: true });
  //         resetForm();
  //       }
  //     })
  //     .catch((err) => console.log("err", err));
  // };
  //
  // const resetForm = useCallback(() => {
  //   setFormFields(initialFormState);
  //
  //   setTimeout(() => {
  //     setFormState((prev) => ({ ...prev, wasSuccessful: false }));
  //   }, 2000);
  // }, []);

  const handleSubmit = useCallback((values: ContactFormFields) => {
    console.log(values);
  }, []);

  return (
    <div className={`${className}`}>
      <Form fields={fields} onSubmit={handleSubmit}>
        <Form.Input name={"name"} />
        <Form.Input name={"email"} />
        <SubmitButton
          submitText={t("Button.Submit")}
          successText={t("Button.Success")}
          className={"md:mt-0 mt-4"}
          isLoading={false}
          wasSuccessful={false}
        />
      </Form>
      {/*<form onSubmit={handleSubmit}>*/}
      {/*  <div*/}
      {/*    className={`grid md:grid-cols-2 grid-cols-1 ${layoutProperties.gap.medium}`}*/}
      {/*  >*/}
      {/*    {Object.entries(formFields).map(([key, values]) => (*/}
      {/*      <FormField*/}
      {/*        key={key}*/}
      {/*        id={values.id}*/}
      {/*        type={values.type}*/}
      {/*        inputType={values.inputType}*/}
      {/*        value={values.value}*/}
      {/*        errorMessage={*/}
      {/*          values.error !== null ? t(`Errors.${values.error}`) : ""*/}
      {/*        }*/}
      {/*        label={t(`Fields.${key}.Label`)}*/}
      {/*        placeholder={t(`Fields.${key}.Placeholder`)}*/}
      {/*        required={values.required}*/}
      {/*        onChange={(e) => handleInputChange(e, key)}*/}
      {/*        className={key === "message" ? "md:col-span-2" : ""}*/}
      {/*      />*/}
      {/*    ))}*/}

      {/*<SubmitButton*/}
      {/*  submitText={t("Button.Submit")}*/}
      {/*  successText={t("Button.Success")}*/}
      {/*  className={"md:mt-0 mt-4"}*/}
      {/*  isLoading={formState.isLoading}*/}
      {/*  wasSuccessful={formState.wasSuccessful}*/}
      {/*/>*/}
      {/*  </div>*/}
      {/*</form>*/}
    </div>
  );
};

export default ContactForm;
