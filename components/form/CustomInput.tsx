"use client";
import React, { ComponentProps } from "react";
import { useSelector } from "react-redux";
import InputUnderline from "@/components/form/InputUnderline";
import { motion, MotionProps, transformProps } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";
import { RootState } from "@/redux/store";

const CustomInput = ({
  id,
  value,
  onChange,
  error,
  placeholder = "",
  ...props
}: ComponentProps<"input"> & MotionProps & { error?: string }) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <div className={"relative"}>
      <motion.input
        id={id}
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
        {...props}
      />
      <InputUnderline isError={error?.length > 0} />
    </div>
  );
};

export default CustomInput;
