"use client";
import React, { useState } from "react";
import FormField from "@/components/form/FormField";
import { layoutProperties } from "@/layout";
import SubmitButton from "@/components/form/SubmitButton";
import axios from "axios";
import formField from "@/components/form/FormField";
import { log } from "util";

const ContactForm = ({ className = "" }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    name: {
      value: "",
      error: null,
    },
    email: {
      value: "",
      error: null,
    },
    phoneNumber: {
      value: "",
      error: null,
    },
    subject: {
      value: "",
      error: null,
    },
    message: {
      value: "",
      error: null,
    },
  });

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

    const errors = {};

    Object.entries(formFields).forEach(([key, values]) => {
      if (key !== "phoneNumber") {
        if (values.value.length === 0) {
          errors[key] = "This field cannot be empty";
        } else {
          errors[key] = null;
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

    setIsLoading(true);

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
      .then((res) => console.log("resss", res))
      .catch((err) => console.log("err", err));

    setIsLoading(false);
  };

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit}>
        <div
          className={`grid md:grid-cols-2 grid-cols-1 ${layoutProperties.gap.large}`}
        >
          <FormField
            required
            errorMessage={formFields.name.error}
            value={formFields.name.value}
            onChange={(e) => handleInputChange(e, "name")}
            placeholder={"Enter your name"}
            label={"Name"}
            type={"text"}
            inputType={"input"}
          />
          <FormField
            required
            errorMessage={formFields.email.error}
            value={formFields.email.value}
            onChange={(e) => handleInputChange(e, "email")}
            placeholder={"Enter your email"}
            label={"Email"}
            inputType={"input"}
            type={"email"}
          />
          <FormField
            required={false}
            errorMessage={formFields.phoneNumber.error}
            value={formFields.phoneNumber.value}
            onChange={(e) => handleInputChange(e, "phoneNumber")}
            placeholder={"Enter your phone"}
            label={"Phone"}
            inputType={"input"}
            type={"tel"}
          />
          <FormField
            required
            errorMessage={formFields.subject.error}
            value={formFields.subject.value}
            onChange={(e) => handleInputChange(e, "subject")}
            placeholder={"Enter the subject"}
            label={"Subject"}
            inputType={"input"}
            type={"text"}
          />

          <FormField
            required
            errorMessage={formFields.message.error}
            value={formFields.message.value}
            onChange={(e) => handleInputChange(e, "message")}
            placeholder={"Enter your message"}
            label={"Message"}
            inputType={"textarea"}
            className={"md:col-span-2"}
          />
          <SubmitButton isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
