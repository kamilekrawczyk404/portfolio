"use client";
import React from "react";
import { layoutProperties } from "@/layout";
import { useSelector } from "react-redux";
import VerticallyAppearingText from "@/components/text/VerticallyAppearingText";
import { animationProperties } from "@/animations";
import AnimatedSingleLetterText from "@/components/text/AnimatedSingleLetterText";

const SectionTitle = ({
  title,
  children,
  className = "",
  whileInView = true,
}) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`relative flex lg:flex-row flex-col lg:items-end ${layoutProperties.gap.medium} ${theme.foreground} ${className}`}
    >
      <div>
        <AnimatedSingleLetterText
          whileInView
          text={title}
          className={`${layoutProperties.text.large}`}
        />
      </div>
      {children}
    </div>
  );
};

export default SectionTitle;
