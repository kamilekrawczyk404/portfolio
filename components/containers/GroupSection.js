"use client";
import React from "react";
import { useSelector } from "react-redux";
import VerticallyAppearingText from "@/components/text/VerticallyAppearingText";

const GroupSection = ({
  title,
  children,
  className = "",
  headerSize = "text-sm",
  whileInView = true,
  delay = 0,
}) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={`flex flex-col relative ${theme.foreground} ${className}`}>
      <VerticallyAppearingText
        text={title}
        className={`${headerSize} ${theme.foreground}`}
        delay={delay}
        whileInView={whileInView}
      />
      {children}
    </div>
  );
};

export default GroupSection;
