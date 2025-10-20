"use client";
import React, { ComponentProps, ReactNode } from "react";
import { HTMLMotionProps, motion, MotionProps } from "framer-motion";
import { animationProperties } from "@/animations";

const AppearingContainer = ({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">): ReactNode => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: animationProperties.durations.medium }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AppearingContainer;
