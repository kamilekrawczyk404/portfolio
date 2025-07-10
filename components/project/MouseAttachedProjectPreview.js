"use client";
import React from "react";
import { motion } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";
import { colors } from "@/layout";

const MouseAttachedProjectPreview = ({ project, shouldBeShown, ...props }) => {
  return (
    <>
      <motion.div
        style={{
          backgroundImage: `url(${project.thumbnail})`,
        }}
        className={
          "absolute top-0 left-0 rounded-lg bg-no-repeat bg-cover w-full h-full pointer-events-none"
        }
        initial={{ opacity: 1 }}
        animate={{ opacity: !shouldBeShown ? 0 : 1 }}
        exit={{ opacity: 1 }}
        transition={{
          ...animationsTypes.default,
          delay: !shouldBeShown ? 0.5 : 0,
          duration: animationProperties.durations.long,
        }}
      />
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{
          opacity: !shouldBeShown ? 0 : 1,
          scale: !shouldBeShown ? 0.75 : 1,
        }}
        transition={animationsTypes.default}
        className={`absolute border-1 cursor-pointer select-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center aspect-square w-[5rem] rounded-full bg-purple !z-[1000] ${
          colors.dark.foreground
        } ${colors.dark.border} ${!shouldBeShown ? "pointer-events-none" : ""}`}
        {...props}
      >
        View
      </motion.div>
    </>
  );
};

export default MouseAttachedProjectPreview;
