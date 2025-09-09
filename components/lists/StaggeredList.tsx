"use client";
import React, { forwardRef, ReactNode, Ref, RefObject } from "react";
import { motion } from "framer-motion";
import { variantsPresets } from "@/animations";
import { Variants } from "motion-dom";

type StaggeredListProps<T> = {
  items: T[];
  render: (item: T, index?: number) => ReactNode;
  className?: string;
  ref?: RefObject<any>;
};
const StaggeredList = <T extends unknown>({
  items,
  render,
  className = "",
  ref = null,
}: StaggeredListProps<T>) => {
  const { parent, children } = variantsPresets.staggered();

  return (
    <motion.ul
      ref={ref}
      className={className === "" ? "flex flex-wrap gap-2" : className}
      variants={parent}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
    >
      {items.map((item, index) => (
        <motion.li key={index} variants={children}>
          {render(item, index)}
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default StaggeredList;
