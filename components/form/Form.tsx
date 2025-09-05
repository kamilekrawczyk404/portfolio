import React, {
  ChangeEvent,
  ComponentProps,
  createContext,
  FormEvent,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomInput from "@/components/form/CustomInput";

// --- Utility Functions and Types (Re-created for a single-file example) ---
const capitalizeWord = (word: string): string =>
  word.substring(0, 1).toUpperCase() + word.substring(1);

type Validation = "required" | "unique";

const errorMessages: {
  [K in Validation]: (fieldName: string) => string;
} = {
  required: (fieldName) => `${capitalizeWord(fieldName)} is required.`,
  unique: (fieldName) =>
    `${capitalizeWord(fieldName)} has an already used value.`,
};

type ValidationProps = {
  required?: boolean;
  unique?: unknown[];
};

export type FieldConfig<T> = {
  value: T;
  label: string;
  placeholder: string;
  validation?: ValidationProps;
};

export type FormFieldsProperties<T> = {
  [K in keyof T]: FieldConfig<T[K]>;
};

type FormFieldState<T> = FieldConfig<T> & {
  error: string | null;
};

type FormState<T> = {
  [K in keyof T]: FormFieldState<T[K]>;
};

// Represents the errors returned by the validation function
type FormErrors<T> = {
  [K in keyof T]?: string | null;
};

type FormContextType<T> = {
  formState: FormState<T>;
  updateValue: (name: keyof T, value: T[keyof T]) => void;
  // We'll also provide a way to trigger validation from child components if needed
  validateField: (name: keyof T) => void;
};

const FormContext = createContext<FormContextType<any> | undefined>(undefined);

const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a Form");
  }
  return context;
};

// --- Form Component and Sub-Components ---
type FormProps<T> = {
  fields: FormFieldsProperties<T>;
  onSubmit: (values: T) => void;
  children: ReactNode;
  className?: string;
};

const Form = <T extends Record<string, any>>({
  fields,
  onSubmit,
  children,
  className = "",
}: FormProps<T>) => {
  const [formState, setFormState] = useState<FormState<T>>(() => {
    const state: any = {};
    for (const name in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, name)) {
        const { value, label, placeholder, validation } = fields[name];
        state[name] = {
          value,
          label,
          placeholder,
          validation,
          error: null,
        };
      }
    }
    return state as FormState<T>;
  });

  // A pure validation function that returns an errors object
  const validateForm = useCallback((state: FormState<T>): FormErrors<T> => {
    const errors: any = {};

    for (const name in state) {
      if (Object.prototype.hasOwnProperty.call(state, name)) {
        const { value, validation } = state[name];
        const fieldName = String(name);

        if (validation?.required) {
          if (
            (typeof value === "string" && !value.trim()) ||
            value === null ||
            value === undefined ||
            (typeof value === "number" && isNaN(value))
          ) {
            errors[name] = errorMessages.required(fieldName);
            continue; // Stop validation for this field once an error is found
          }
        }

        if (validation?.unique && validation.unique.includes(value)) {
          errors[name] = errorMessages.unique(fieldName);
        }
      }
    }
    return errors as FormErrors<T>;
  }, []);

  const updateValue = useCallback((name: keyof T, value: T[keyof T]) => {
    setFormState((prev) => {
      // Clear the error for the field being updated
      const newState = {
        ...prev,
        [name]: {
          ...prev[name],
          value,
          error: null,
        },
      };
      return newState;
    });
  }, []);

  // A function to validate a single field (e.g., onBlur)
  const validateField = useCallback(
    (name: keyof T) => {
      const errors = validateForm(formState);
      if (errors[name]) {
        setFormState((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            error: errors[name],
          },
        }));
      } else {
        setFormState((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            error: null,
          },
        }));
      }
    },
    [formState, validateForm],
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const errors = validateForm(formState);
      const hasErrors = Object.keys(errors).length > 0;

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
        const values: any = {};
        for (const name in formState) {
          if (Object.prototype.hasOwnProperty.call(formState, name)) {
            values[name] = formState[name].value;
          }
        }
        onSubmit(values as T);
      }
    },
    [formState, onSubmit, validateForm],
  );

  const contextValue = useMemo(
    () => ({ formState, updateValue, validateField }),
    [formState, updateValue, validateField],
  );

  return (
    <FormContext.Provider value={contextValue}>
      <form onSubmit={handleSubmit} className={className}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

// --- In-line Sub-Components (to make the file runnable) ---
const VerticallyAppearingText = ({ text, className = "" }) => (
  <motion.span
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.2 }}
    className={className}
  >
    {text}
  </motion.span>
);

const FormLabel = ({ htmlFor, required, error, children }) => (
  <label
    htmlFor={htmlFor}
    className="relative inline-flex gap-2 items-end text-sm text-gray-600 font-medium"
  >
    <span className="whitespace-nowrap">
      {children}
      {required && <span className="text-red-500">*</span>}
    </span>
    <AnimatePresence mode={"wait"}>
      {error && (
        <VerticallyAppearingText
          text={error}
          className="text-sm text-red-600 !pb-[.125rem]"
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

const Input = ({
  name,
  type = "text",
}: Pick<ComponentProps<"input">, "name" | "type">) => {
  const { formState, updateValue, validateField } = useFormContext();
  const { error, value, validation, label, placeholder } = formState[name];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    updateValue(name, newValue);
  };

  const handleBlur = () => {
    validateField(name);
  };

  return (
    <FormContainer>
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

// --- Assigning sub-components ---
Form.Label = FormLabel;
Form.Container = FormContainer;
Form.Input = Input;

export default Form;
