"use client";
import React, { ComponentProps, ReactNode } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RootState } from "@/redux/store";
import { layoutProperties } from "@/layout";

type AspectProps = {
  name: string;
  icon?: ReactNode;
  props?: ComponentProps<"div">;
};
const Aspect = ({ name, icon = null, ...props }: AspectProps) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <motion.div
      className={`min-h-[1.75rem] rounded-xl px-2 py-[.125rem] flex items-center gap-x-2 border-1 shadow-xs ${theme.borderSecondary} ${theme.foreground} ${layoutProperties.text.extraSmall}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {name}
    </motion.div>
  );
};

export default Aspect;
