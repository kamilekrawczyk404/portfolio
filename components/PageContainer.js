import React from "react";
import { layoutProperties } from "@/layout";

const PageContainer = ({
  children,
  includeNavigationHeight = false,
  className = "",
}) => {
  return (
    <div
      className={`min-h-fit w-full relative ${
        !includeNavigationHeight ? "h-[calc(100dvh-4rem)]" : "h-[100dvh]"
      } ${layoutProperties.body.padding} ${className}`}
    >
      {children}
    </div>
  );
};

export default PageContainer;
