"use client";
import React, { ComponentProps } from "react";
import { layoutProperties } from "@/layout";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type PageContainerProps = ComponentProps<"div"> & {
  section?: boolean;
  screenHeight?: boolean;
  includeNavigationHeight?: boolean;
  centerItems?: boolean;
};

const PageContainer = ({
  children,
  className = "",
  includeNavigationHeight = false,
  section = false,
  screenHeight = true,
  centerItems = false,
  ...props
}: PageContainerProps) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <div
      className={`relative w-full ${
        includeNavigationHeight
          ? "!mt-[4rem] lg:h-[calc(100vh-4rem)] !min-h-[calc(100vh-4rem)]"
          : `${theme.backgroundDark}`
      } ${section ? `min-h-fit relative flex flex-col justify-center` : ""} ${
        screenHeight ? "lg:h-[100vh]" : ""
      } ${centerItems ? "flex flex-col items-center justify-center" : ""} ${
        layoutProperties.body.padding
      }`}
      {...props}
    >
      <div className={`lg:w-6xl w-full mx-auto ${className}`}>{children}</div>
    </div>
  );
};

export default PageContainer;
