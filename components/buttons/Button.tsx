"use client";
import { motion, MotionProps } from "framer-motion";
import React, { ComponentProps } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export type ButtonProps = ComponentProps<"button"> &
  MotionProps & {
    dataTestId?: string;
    filled?: boolean;
    square?: boolean;
    navigation?: boolean;
    main?: boolean;
  };

const Button = ({
  children,
  dataTestId,
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
      data-testid={dataTestId}
      className={`${
        filled
          ? `${opposite.backgroundLight} ${opposite.foreground} ${theme.border}`
          : `${theme.backgroundLight} ${theme.foreground}`
      } cursor-pointer relative transition-colors ${
        square ? "aspect-square rounded-full" : "rounded-lg"
      } ${navigation ? "px-2 h-[1.75rem] w-fit text-sm " : ""} ${
        main ? "px-2 min-h-10 shadow-md" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
