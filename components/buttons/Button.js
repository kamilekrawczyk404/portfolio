import { motion } from "framer-motion";
import React from "react";

const Button = ({
  children,
  filled = false,
  square = false,
  className = "",
  ...props
}) => {
  return (
    <motion.button
      className={`${
        filled
          ? "bg-neutral-900 text-gray-100"
          : "text-neutral-900 hover:bg-neutral-900 hover:text-gray-100"
      } rounded-full border-1 border-neutral-900 text-sm px-2 h-[1.75rem] w-fit cursor-pointer transition-all relative ${
        square ? "aspect-square" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
