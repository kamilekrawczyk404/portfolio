"use client";
import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const StaggeredList = forwardRef(
  (
    {
      items,
      parentVariants = {},
      childrenVariants = {},
      render = () => {},
      className = "",
    },
    ref,
  ) => {
    const variants = {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
          when: "beforeChildren",
        },
      },
      exit: {
        opacity: 0,
      },
    };

    const itemVariants = {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
      },
      exit: {
        opacity: 0,
      },
    };
    return (
      <motion.ul
        ref={ref}
        className={className === "" ? "flex flex-wrap gap-2" : className}
        variants={variants}
        initial={"initial"}
        animate={"animate"}
        exit={"exit"}
      >
        {items.map((item, index) => (
          <motion.li key={index} variants={itemVariants}>
            {render(item, index)}
          </motion.li>
        ))}
      </motion.ul>
    );
  },
);

export default StaggeredList;
