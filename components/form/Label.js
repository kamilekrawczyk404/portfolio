"use client";
import React from "react";
import { useSelector } from "react-redux";
import { colors, layoutProperties } from "@/layout";
import VerticallyAppearingText from "@/components/text/VerticallyAppearingText";
import { AnimatePresence } from "framer-motion";

const Label = ({ htmlFor, required, error, children }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <label
      htmlFor={htmlFor}
      className={`${theme.text} ${layoutProperties.text.small} inline-flex gap-2 min-h-[2rem] items-end`}
    >
      <span>
        {children}
        {required && <span> *</span>}
      </span>
      <AnimatePresence mode={"popLayout"}>
        {error && (
          <VerticallyAppearingText
            text={error}
            direction={"fromTop"}
            className={`text-sm text-red-700`}
          />
        )}
      </AnimatePresence>
    </label>
  );
};

export default Label;
