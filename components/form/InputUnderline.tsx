import React, { ReactNode } from "react";

type InputUnderlineProps = {
  isError: boolean;
};
const InputUnderline = ({ isError }: InputUnderlineProps): ReactNode => {
  return (
    <div
      className={`absolute left-0 bottom-0 h-[0.1rem] w-0 peer-focus:w-full transition-all ${
        isError ? "bg-red-700" : "bg-purple"
      }`}
    />
  );
};

export default InputUnderline;
