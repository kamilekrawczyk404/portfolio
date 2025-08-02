"use client";
import React, { useState } from "react";
import FormField from "@/components/form/FormField";
import { layoutProperties } from "@/layout";
import SubmitButton from "@/components/form/SubmitButton";
import axios from "axios";
import formField from "@/components/form/FormField";

const initialFormState = {
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
};

const ContactForm = ({ className = "" }) => {
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
        errors[key] = "Email is not valid";
      }

      if (
        key === "phoneNumber" &&
        values.value.length > 0 &&
        !/^(?:\+48|0048)?\d{9}$/.test(values.value)
      ) {
        errors[key] = "Phone number is not valid.\n Required 9 digits.";
      }

      if (key !== "phoneNumber") {
        if (values.value.length === 0) {
          errors[key] = "This field cannot be empty";
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
      // setFormFields(initialFormState);

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
          <SubmitButton
            isLoading={formState.isLoading}
            wasSuccessful={formState.wasSuccessful}
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
