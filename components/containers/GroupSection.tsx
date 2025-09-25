"use client";
import React, { ComponentProps, JSX, ReactNode } from "react";
import { useSelector } from "react-redux";
import { layoutProperties } from "@/layout";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";
import { variantsPresets } from "@/animations";

type GroupSectionProps = Omit<ComponentProps<"div">, "title"> & {
  title?: () => ReactNode | JSX.Element;
  delay?: number;
};
const GroupSection = ({
  title,
  children,
  delay = 0,
  className = "",
}: GroupSectionProps): ReactNode => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const variants = variantsPresets.appearing({ delay });

  return (
    <motion.div
      {...variants}
      className={`flex flex-col relative ${layoutProperties.gap.extraSmall} ${theme.foreground} ${className}`}
    >
      {title && (
        <span className={"text-neutral-600 text-sm font-[500]"}>{title()}</span>
      )}
      {children}
    </motion.div>
  );
};

export default GroupSection;
