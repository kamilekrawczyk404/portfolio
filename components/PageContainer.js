"use client";
import React from "react";
import { layoutProperties } from "@/layout";
import { useSelector } from "react-redux";

const PageContainer = ({
  children,
  includeNavigationHeight = false,
  section = false,
  className = "",
}) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      // style={{ minHeight: "fit-content" }}
      className={`w-full relative min-h-fit ${
        includeNavigationHeight
          ? "!mt-[4rem] lg:h-[calc(100vh-4rem)]"
          : "lg:h-[100vh]"
      } ${
        section
          ? `${theme.background} relative flex flex-col justify-center ${layoutProperties.gap.large}`
          : ""
      } ${layoutProperties.body.padding} ${className}`}
    >
      {children}
    </div>
  );
};

export default PageContainer;
