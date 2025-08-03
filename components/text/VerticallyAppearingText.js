"use client";
import React from "react";
import { motion } from "framer-motion";
import { animationsTypes, variantsPresets } from "@/animations";
import { useSelector } from "react-redux";

const VerticallyAppearingText = ({
  text,
  whileInView = false,
  direction = "fromTop",
  className = "",
  delay = 0,
}) => {
  const { theme } = useSelector((state) => state.theme);

  const { initial, animate, exit } =
    variantsPresets.verticalAppearing(direction);

  return (
    <div
      className={`overflow-hidden h-fit w-fit lg:pb-1 ${theme.foreground} ${className}`}
    >
      <motion.h3
        initial={initial}
        viewport={{ once: true }}
        whileInView={
          whileInView
            ? {
                ...animate,
                transition: {
                  ...animate.transition,
                  ...animationsTypes.default,
                  delay,
                },
              }
            : {}
        }
        animate={
          !whileInView
            ? {
                ...animate,
                transition: {
                  ...animate.transition,
                  ...animationsTypes.default,
                  delay,
                },
              }
            : {}
        }
        exit={exit}
        transition={animationsTypes.default}
      >
        {text}
      </motion.h3>
    </div>
  );
};

export default VerticallyAppearingText;
