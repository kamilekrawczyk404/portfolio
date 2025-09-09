"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { animationsTypes, Direction, variantsPresets } from "@/animations";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Variants } from "motion-dom";

type VerticallyAppearingTextProps = {
  text: string;
  direction?: Direction;
  whileInView?: boolean;
  className?: string;
  delay?: number;
};
const VerticallyAppearingText = ({
  text,
  whileInView = false,
  direction = "fromTop",
  className = "",
  delay = 0,
}: VerticallyAppearingTextProps): ReactNode => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const variants = variantsPresets.verticalAppearing(direction);

  return (
    <div
      className={`overflow-hidden h-fit w-fit ${theme.foreground} ${className}`}
    >
      <motion.h3
        variants={variants}
        viewport={{ once: true }}
        initial={"initial"}
        exit={"exit"}
        whileInView={
          whileInView
            ? {
                ...variants.animate,
                transition: {
                  ...variants.animate?.transition,
                  ...animationsTypes.default,
                  delay,
                },
              }
            : {}
        }
        animate={
          !whileInView
            ? {
                ...variants.animate,
                transition: {
                  ...variants.animate.transition,
                  ...animationsTypes.default,
                  delay,
                },
              }
            : {}
        }
        transition={animationsTypes.default}
      >
        {text}
      </motion.h3>
    </div>
  );
};

export default VerticallyAppearingText;
