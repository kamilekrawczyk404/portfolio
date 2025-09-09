"use client";
import React, { JSX } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Variants } from "motion-dom";
import { RootState } from "@/redux/store";
import ProgressBar from "@/components/project/ProgressBar";

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
      className={`flex flex-col gap-y-1 relative ${theme.foreground}`}
      onAnimationComplete={onAnimationComplete}
    >
      <span>{aspect.name}</span>
      <ProgressBar
        percentage={aspect.knowledge}
        shouldAnimate={shouldAnimate}
      />
    </motion.div>
  );
};

export default ProgressBarAspect;
