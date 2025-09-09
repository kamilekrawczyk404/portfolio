"use client";
import React, { ComponentProps, useRef } from "react";
import { useSelector } from "react-redux";
import InputUnderline from "@/components/form/InputUnderline";
import { animationProperties } from "@/animations";
import { motion } from "framer-motion";
import { RootState } from "@/redux/store";

const Textarea = ({
  id,
  onChange,
  onBlur,
  value,
  error,
  placeholder = "",
  className = "",
}: ComponentProps<"textarea"> & { error?: string }) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <div className={"relative min-h-32 flex"}>
      <div className={"w-full relative"}>
        <motion.textarea
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`border-b-1 outline-none min-h-full peer w-full p-2 pr-18  ${
            error ? "border-red-500" : theme.border
          } ${className}`}
          initial={false}
          animate={{
            translateX: error
              ? ["0px", "5px", "-5px", "2.5px", "-2.5px", 0]
              : null,
          }}
          maxLength={300}
          transition={{
            duration: animationProperties.durations.medium,
            times: [0.2, 0.2, 0.2, 0.2, 0.2],
          }}
        />
        <InputUnderline isError={error?.length > 0} />
        <div
          className={
            "absolute right-0 top-0 z-10 text-sm text-gray-500 text-nowrap p-2"
          }
        >
          {value.toString().length} / 300
        </div>
      </div>
    </div>
  );
};

export default Textarea;
