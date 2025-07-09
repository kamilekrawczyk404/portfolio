"use client";
import React from "react";
import { motion } from "framer-motion";
import { animationsTypes } from "@/animations";
import { useSelector } from "react-redux";

const AnimatedTextWithOverflow = ({
  text,
  direction = "fromTopToBottom",
  className = "",
  delay = 0,
}) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`overflow-hidden h-fit w-fit lg:pb-1 ${theme.foreground} ${className}`}
    >
      <motion.h3
        initial={{
          y: direction === "fromTopToBottom" ? "-100%" : "100%",
        }}
        animate={{
          y: 0,
          transition: {
            ...animationsTypes.default,
            delay,
          },
        }}
        exit={{
          y: direction === "fromTopToBottom" ? "100%" : "-100%",
        }}
        transition={animationsTypes.default}
      >
        {text}
      </motion.h3>
    </div>
  );
};

export default AnimatedTextWithOverflow;
