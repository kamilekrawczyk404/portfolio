import React from "react";
import { colors, layoutProperties } from "@/layout";
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
      className={`min-h-fit w-full relative ${
        includeNavigationHeight
          ? "!mt-[4rem] h-[calc(100dvh-4rem)]"
          : "h-[100dvh]"
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
