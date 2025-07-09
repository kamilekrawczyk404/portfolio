"use client";
import React from "react";
import ProgressBar from "@/components/ProgressBar";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const ProgressBarAspect = ({
  aspect,
  variants = {},
  shouldAnimate,
  onAnimationComplete = () => {},
}) => {
  const { theme } = useSelector((state) => state.theme);

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
