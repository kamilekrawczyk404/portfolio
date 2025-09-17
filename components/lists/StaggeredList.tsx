"use client";
import React, { ComponentProps, ReactNode, RefObject } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { variantsPresets } from "@/animations";
import { Transition } from "motion-dom";

type StaggeredListProps<T> = {
  items: T[];
  render: (item: T, index?: number) => ReactNode;
  transition?: Transition;
} & HTMLMotionProps<"ul">;

const StaggeredList = <T extends unknown>({
  items,
  render,
  transition = {},
  ...props
}: StaggeredListProps<T>) => {
  const { parent, children } = variantsPresets.staggered(transition);

  return (
    <motion.ul
      {...props}
      variants={parent}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      className={!props.className ? "flex flex-wrap gap-2" : props.className}
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
