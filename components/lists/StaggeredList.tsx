"use client";
import React, { ComponentProps, ReactNode, RefObject } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import {
  animationsTypes,
  ChildrenVariants,
  HorizontalAppearing,
  variantsPresets,
} from "@/animations";
import { Transition, Variants } from "motion-dom";

type AnimationType = "horizontalAppearing" | "defaultAppearing";

type AnimationOptions = {
  duration?: number;
  delay?: number;
  childrenOffset?: number | string;
};

type StaggeredListProps<T> = {
  items: T[];
  render: (item: T, index?: number) => ReactNode;
  transition?: Transition;
  dataTestId?: string;
  animationType?: AnimationType;
  animationOptions?: AnimationOptions;
} & HTMLMotionProps<"ul">;

const staggerFunctions: { [key in AnimationType]: string } = {
  defaultAppearing: "staggered",
  horizontalAppearing: "horizontalAppearing",
};

const StaggeredList = <T extends unknown>({
  items,
  render,
  dataTestId,
  animationType = "defaultAppearing",
  transition = {},
  animationOptions = {
    childrenOffset: 10,
    duration: 0.5,
    delay: 0,
  },
  ...props
}: StaggeredListProps<T>) => {
  const { parent, children } = variantsPresets[staggerFunctions[animationType]](
    {
      props: { ...props, ...animationOptions },
      offset: animationOptions.childrenOffset,
    },
  );

  return (
    <AnimatePresence mode={"popLayout"}>
      <motion.ul
        data-testid={dataTestId}
        {...props}
        variants={parent}
        initial={"initial"}
        animate={"animate"}
        exit={"exit"}
        className={!props.className ? "flex flex-wrap gap-2" : props.className}
      >
        {items.map((item, index) => (
          <motion.li
            key={index}
            variants={
              animationType === "horizontalAppearing"
                ? (children as ChildrenVariants)[
                    index % 2 === 0 ? "left" : "right"
                  ]
                : children
            }
          >
            {render(item, index)}
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
};

export default StaggeredList;
