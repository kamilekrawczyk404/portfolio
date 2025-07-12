import React from "react";
import { layoutProperties } from "@/layout";
import { useSelector } from "react-redux";

const SectionTitle = ({ title, children }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`relative flex lg:flex-row flex-col lg:items-end ${layoutProperties.gap.medium} ${theme.foreground}`}
    >
      <h2 className={`${layoutProperties.text.large}`}>{title}</h2>
      {children}
    </div>
  );
};

export default SectionTitle;
