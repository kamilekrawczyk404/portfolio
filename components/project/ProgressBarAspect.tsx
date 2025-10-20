"use client";
import React, { JSX } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Variants } from "motion-dom";
import { RootState } from "@/redux/store";
import ProgressBar from "@/components/project/ProgressBar";
import { layoutProperties } from "@/layout";
import TextWithCode from "@/components/text/TextWithCode";

type ProgressBarAspectProps = {
  aspect: { name: string; knowledge: number };
  variants: Variants;
  shouldAnimate?: boolean;
} & HTMLMotionProps<"div">;

const ProgressBarAspect = ({
  aspect,
  variants = {},
  shouldAnimate,
  onAnimationComplete,
}: ProgressBarAspectProps): JSX.Element => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <motion.div
      variants={variants}
      className={`flex flex-col relative ${theme.foreground}`}
      onAnimationComplete={onAnimationComplete}
    >
      <h5 className={`font-[500] mb-[.125rem] ${layoutProperties.text.small}`}>
        {aspect.name}
      </h5>
      <ProgressBar
        percentage={aspect.knowledge}
        shouldAnimate={shouldAnimate}
      />
    </motion.div>
  );
};

export default ProgressBarAspect;
