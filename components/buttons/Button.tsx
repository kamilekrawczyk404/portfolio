"use client";
import { motion, MotionProps } from "framer-motion";
import React, {
  ButtonHTMLAttributes,
  ComponentProps,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export type ButtonProps = ComponentProps<"button"> &
  MotionProps & {
    filled?: boolean;
    square?: boolean;
    navigation?: boolean;
    main?: boolean;
  };

const Button = ({
  children,
  filled = false,
  square = false,
  className = "",
  navigation = false,
  main = false,
  ...props
}: ButtonProps) => {
  const { opposite, theme } = useSelector((state: RootState) => state.theme);

  return (
    <motion.button
      className={`${
        filled
          ? `${opposite.background} ${opposite.foreground} ${opposite.border}`
          : `${theme.foreground} ${theme.hover.background} ${theme.hover.foreground} ${theme.hover.border}`
      } border-1 cursor-pointer relative transition-colors ${
        square ? "aspect-square rounded-full" : "rounded-xl"
      } ${navigation ? "px-2 h-[1.75rem] w-fit text-sm " : ""} ${
        main ? "text-xl px-4 min-h-[2.75rem]" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
