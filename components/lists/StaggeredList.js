"use client";
import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { variantsPresets } from "@/animations";

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
    const { parent, children } = variantsPresets.staggered;

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
  },
);

export default StaggeredList;
