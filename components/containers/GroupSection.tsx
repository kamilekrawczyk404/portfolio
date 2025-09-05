"use client";
import React, { ComponentProps, ReactNode } from "react";
import { useSelector } from "react-redux";
import VerticallyAppearingText from "@/components/text/VerticallyAppearingText";
import { layoutProperties } from "@/layout";
import { RootState } from "@/redux/store";

type GroupSectionProps = ComponentProps<"div"> & {
  title: string;
  headerSize: string;
  whileInView?: boolean;
  delay?: number;
};
const GroupSection = ({
  title,
  children,
  className = "",
  headerSize = "text-sm",
  whileInView = true,
  delay = 0,
}: GroupSectionProps): ReactNode => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <div
      className={`flex flex-col relative ${layoutProperties.gap.extraSmall} ${theme.foreground} ${className}`}
    >
      <VerticallyAppearingText
        text={title}
        className={`${headerSize} ${theme.foreground} text-nowrap`}
        delay={delay}
        whileInView={whileInView}
      />
      {children}
    </div>
  );
};

export default GroupSection;
