"use client";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import InputUnderline from "@/components/form/InputUnderline";
import { animationProperties } from "@/animations";
import { motion } from "framer-motion";

const Textarea = ({
  onChange,
  value,
  error,
  placeholder = "",
  className = "",
}) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={"relative min-h-32 flex"}>
      <div className={"w-full relative"}>
        <motion.textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`border-b-1 outline-none min-h-full peer w-full p-2  ${
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
        <InputUnderline isError={error} />
      </div>

      <div className={"z-10 text-sm text-gray-500 text-nowrap p-2"}>
        {value.length} / 300
      </div>
    </div>
  );
};

export default Textarea;
