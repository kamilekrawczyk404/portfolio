import React from "react";
import Label from "@/components/form/Label";
import CustomInput from "@/components/form/CustomInput";
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
        <CustomInput
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
