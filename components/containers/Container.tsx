"use client";
import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Container = () => {};

const Default = ({
  children,
  dataTestId,
  className = "",
  ...props
}: HTMLMotionProps<"div"> & { dataTestId?: string }) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <motion.div
      data-testid={dataTestId}
      className={`lg:p-6 p-4 border-1 rounded-lg ${theme.background} ${theme.borderSecondary} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

Container.Default = Default;

export default Container;
