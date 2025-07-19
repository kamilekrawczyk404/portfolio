"use client";
import React from "react";
import { useSelector } from "react-redux";

const GroupSection = ({
  title,
  children,
  className = "",
  headerSize = "text-sm",
}) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`flex flex-col gap-1 relative ${theme.foreground} ${className}`}
    >
      <h4 className={`${headerSize} ${theme.foreground}`}>{title}</h4>
      {children}
    </div>
  );
};

export default GroupSection;
