import React from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/Input";
import Textarea from "@/components/form/Textarea";

const FormField = ({
  inputType = "input",
  id,
  label,
  onChange,
  value,
  type,
  errorMessage = null,
  placeholder = "",
  required = true,
  className = "",
}) => {
  return (
    <FormFieldContainer className={className}>
      <Label htmlFor={id} required={required} error={errorMessage}>
        {label}
      </Label>
      {inputType === "input" ? (
        <Input
          id={id}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={type}
          error={errorMessage}
        />
      ) : (
        <Textarea
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          error={errorMessage}
        />
      )}
    </FormFieldContainer>
  );
};

export default FormField;

const FormFieldContainer = ({ children, className = "" }) => (
  <div className={`flex flex-col gap-1 ${className}`}>{children}</div>
);
