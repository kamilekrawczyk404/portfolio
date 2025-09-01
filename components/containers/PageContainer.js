"use client";
import React from "react";
import { layoutProperties } from "@/layout";
import { useSelector } from "react-redux";

const PageContainer = ({
  children,
  includeNavigationHeight = false,
  section = false,
  className = "",
  screenHeight = true,
  ...props
}) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      // style={{ minHeight: "fit-content" }}
      className={`w-full relative ${
        includeNavigationHeight
          ? "!mt-[4rem] lg:h-[calc(100vh-4rem)] !min-h-[calc(100vh-4rem)]"
          : `${theme.background}`
      } ${
        section
          ? `min-h-fit relative flex flex-col justify-center ${layoutProperties.gap.large}`
          : ""
      } ${screenHeight ? "lg:h-[100vh]" : ""} ${
        layoutProperties.body.padding
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default PageContainer;
