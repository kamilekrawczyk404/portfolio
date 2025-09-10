"use client";

import React, {
  ChangeEvent,
  ComponentProps,
  createContext,
  FormEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence } from "framer-motion";
import CustomInput from "@/components/form/CustomInput";
import VerticallyAppearingText from "@/components/text/VerticallyAppearingText";
import Textarea from "@/components/form/Textarea";
import { useTranslations } from "next-intl";
import { useLocale } from "use-intl";
import { TFunction } from "@/types/types";

type ErrorMessageType =
  | "required"
  | "unique"
  | "email"
  | "phoneNumber"
  | "custom";

const translationPrefix = "HomePage.Contact.Form.Errors";

const errorMessages: {
  [K in ErrorMessageType]: (t: TFunction, i18nValue?: string) => string;
} = {
  required: (t) => t(`${translationPrefix}.Required`),
  email: (t) => t(`${translationPrefix}.Email`),
  phoneNumber: (t) => t(`${translationPrefix}.PhoneNumber`),
  unique: (t) => t(`${translationPrefix}.Unique`),
  custom: (t, i18nValue) => t(i18nValue),
};

type ValidationProps = {
  required?: boolean;
  unique?: unknown[];
  custom?: {
    validate: (value: any) => boolean;
    i18nValue?: string;
  };
};

export type FieldConfig = {
  value: string | boolean;
  validation?: ValidationProps;
};

export type FormFieldsProperties<T> = {
  [K in keyof T]: FieldConfig;
};

type FormFieldState = FieldConfig & {
  error: string | null;
  touched: boolean;
};

type FormState<T> = {
  [K in keyof T]: FormFieldState;
};

// Represents the errors returned by the validation function
type FormErrors<T> = {
  [K in keyof T]?: string | null;
};

type FormContextType<T> = {
  formState: FormState<T>;
  updateField: (name: keyof T, value: string | boolean, error?: string) => void;
};

const FormContext = createContext<FormContextType<any> | undefined>(undefined);

const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a Form");
  }
  return context;
};

const validateField = (
  t: TFunction,
  value: string | boolean,
  validation: ValidationProps,
): string | null => {
  let error: string | null = null;

  if (validation?.required) {
    if (
      (typeof value === "string" && !(value as string).trim().length) ||
      (typeof value === "number" && isNaN(value))
    ) {
      error = errorMessages.required(t);
    }
  }

  if ((value as string).length > 0 && validation?.custom) {
    if (!validation.custom.validate(value)) {
      error = errorMessages.custom(t, validation.custom.i18nValue);
    }
  }

  if (validation?.unique && validation.unique.includes(value)) {
    error = errorMessages.unique(t);
  }

  return error;
};

// --- Form Component and Sub-Components ---
type FormProps<T> = {
  id: string;
  fields: FormFieldsProperties<T>;
  options?: {
    resetOnSubmit: boolean;
  };
  onSubmit: (values: { [K in keyof T]: string | boolean }) => void;
  children: ReactNode;
  className?: string;
};

const Form = <T extends Record<string, any>>({
  id,
  fields,
  onSubmit,
  children,
  options = { resetOnSubmit: true },
  className = "",
}: FormProps<T>) => {
  const t = useTranslations();
  const locale = useLocale();

  const [formState, setFormState] = useState<FormState<T>>(() => {
    const state: any = {};

    for (const name in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, name)) {
        const { value, validation } = fields[name];

        state[name] = {
          value,
          validation,
          error: null,
          touched: false,
        };
      }
    }
    return state as FormState<T>;
  });

  const validateForm = useCallback(
    (state: FormState<T>): FormErrors<T> => {
      const errors: any = {};

      for (const name in state) {
        if (Object.prototype.hasOwnProperty.call(state, name)) {
          const { value, validation } = state[name];

          errors[name] = validateField(t, value, validation);
        }
      }

      return errors as FormErrors<T>;
    },
    [t],
  );

  const updateField = useCallback(
    (name: keyof T, value: string | boolean, error?: string): void => {
      setFormState((prev) => {
        const newState: FormState<T> = {
          ...prev,
          [name]: {
            ...prev[name],
            value,
            error,
            touched: true,
          },
        };

        return newState;
      });
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const errors = validateForm(formState);
      const hasErrors = Object.values(errors).some((e) => e !== null);

      if (hasErrors) {
        // Update state with all errors at once
        setFormState((prev) => {
          const newState = { ...prev };

          for (const name in errors) {
            if (Object.prototype.hasOwnProperty.call(errors, name)) {
              newState[name] = { ...newState[name], error: errors[name] };
            }
          }
          return newState;
        });
      } else {
        const values = Object.keys(formState).reduce(
          (acc, key: keyof T) => {
            acc[key] = formState[key].value;
            return acc;
          },
          {} as { [K in keyof T]: string | boolean },
        );

        onSubmit(values);

        if (options.resetOnSubmit) {
          setFormState(
            Object.fromEntries(
              Object.entries(formState).map(([key, values]) => [
                key,
                { ...values, value: "", error: null },
              ]),
            ) as FormState<T>,
          );
        }
      }
    },
    [formState, onSubmit, validateForm],
  );

  const contextValue = useMemo(
    () => ({
      formState,
      updateField,
    }),
    [formState, updateField, locale],
  );

  useEffect(() => {
    const newErrors = validateForm(formState);

    setFormState((prev) => {
      const newState = { ...prev };

      for (const name in newErrors) {
        if (Object.prototype.hasOwnProperty.call(newErrors, name)) {
          if (!newState[name].touched) continue;

          newState[name] = { ...newState[name], error: newErrors[name] };
        }
      }

      return newState;
    });
  }, [locale]);

  return (
    <FormContext.Provider value={contextValue}>
      <form id={id} onSubmit={handleSubmit} className={className}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

const FormLabel = ({ htmlFor, required, error, children }) => (
  <label
    htmlFor={htmlFor}
    className="relative inline-flex gap-2 items-end w-full text-sm text-gray-600 font-medium"
  >
    <span className="whitespace-nowrap">
      {children}
      {required && <span>*</span>}
    </span>
    <AnimatePresence mode={"wait"}>
      {error && (
        <VerticallyAppearingText
          dataTestId={`${htmlFor}-error-label`}
          text={error}
          className="text-sm text-red-600"
        />
      )}
    </AnimatePresence>
  </label>
);

const FormContainer = ({
  children,
  className = "",
  ...props
}: ComponentProps<"div">) => (
  <div className={`flex flex-col gap-1 ${className}`} {...props}>
    {children}
  </div>
);

const FormInput = ({
  name,
  className,
  label,
  placeholder,
  type = "text",
}: Pick<
  ComponentProps<"input">,
  "name" | "type" | "className" | "placeholder"
> & { label: string }) => {
  const t = useTranslations();

  const { formState, updateField } = useFormContext();
  const { error, value, validation } = formState[name];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    updateField(name, newValue);
  };

  const handleBlur = () => {
    updateField(name, value, validateField(t, value, validation));
  };

  return (
    <FormContainer className={className}>
      <FormLabel htmlFor={name} required={validation?.required} error={error}>
        {label}
      </FormLabel>
      <CustomInput
        id={name}
        name={name}
        type={type}
        error={error}
        checked={typeof value === "boolean" ? value : undefined}
        value={typeof value !== "boolean" ? value : undefined}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
    </FormContainer>
  );
};

const FormTextarea = ({
  name,
  placeholder,
  label,
  className,
}: Pick<ComponentProps<"textarea">, "name" | "className" | "placeholder"> & {
  label: string;
}) => {
  const t = useTranslations();
  const { formState, updateField } = useFormContext();
  const { error, value, validation } = formState[name];

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateField(name, e.target.value);
  };

  const handleBlur = () => {
    updateField(name, value, validateField(t, value, validation));
  };

  return (
    <FormContainer className={className}>
      <FormLabel htmlFor={name} required={validation?.required} error={error}>
        {label}
      </FormLabel>
      <Textarea
        id={name}
        name={name}
        error={error}
        value={value as string}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
    </FormContainer>
  );
};

// --- Assigning sub-components ---
Form.Label = FormLabel;
Form.Container = FormContainer;
Form.Textarea = FormTextarea;
Form.Input = FormInput;

export default Form;
