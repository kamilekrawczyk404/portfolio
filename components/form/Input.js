"use client";
import React from "react";
import { useSelector } from "react-redux";
import InputUnderline from "@/components/form/InputUnderline";
import { motion, transformProps } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";

const Input = ({ value, onChange, error, placeholder = "" }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={"relative"}>
      <motion.input
        initial={false}
        animate={{
          translateX: error
            ? ["0px", "5px", "-5px", "2.5px", "-2.5px", 0]
            : null,
        }}
        transition={{
          duration: animationProperties.durations.medium,
          times: [0.2, 0.2, 0.2, 0.2, 0.2],
        }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`outline-none w-full border-b-1 p-2 peer ${
          error ? "border-red-500" : theme.border
        }`}
      />
      <InputUnderline isError={error} />
    </div>
  );
};

export default Input;
