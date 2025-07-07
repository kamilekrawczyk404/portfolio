import React from "react";
import { colors, layoutProperties } from "@/layout";

const PageContainer = ({
  children,
  includeNavigationHeight = false,
  section = false,
  className = "",
}) => {
  return (
    <div
      className={`min-h-fit w-full relative ${
        !includeNavigationHeight ? "h-[calc(100dvh-4rem)]" : "h-[100dvh]"
      } ${
        section
          ? `${colors.light.background} flex flex-col justify-center gap-8`
          : ""
      } ${layoutProperties.body.padding} ${className}`}
    >
      {children}
    </div>
  );
};

export default PageContainer;
