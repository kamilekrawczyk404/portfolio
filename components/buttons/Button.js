import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { colors } from "@/layout";

const Button = ({
  children,
  filled = false,
  square = false,
  className = "",
  navigation = false,
  main = false,
  ...props
}) => {
  const { opposite, theme } = useSelector((state) => state.theme);

  return (
    <motion.button
      className={`${
        filled
          ? `${opposite.background} ${opposite.foreground} ${opposite.border}`
          : `${theme.foreground} ${theme.hover.background} ${theme.hover.foreground} ${theme.hover.border}`
      } border-1 cursor-pointer relative transition-colors ${
        square ? "aspect-square rounded-full" : "rounded-xl"
      } ${navigation ? "px-2 h-[1.75rem] w-fit text-sm " : ""} ${
        main ? "text-2xl px-4 py-2" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
