"use client";
import React, { ReactNode } from "react";
import { layoutProperties } from "@/layout";
import { useSelector } from "react-redux";
import VerticallyAppearingText from "@/components/text/VerticallyAppearingText";
import { animationProperties } from "@/animations";
import AnimatedSingleLetterText from "@/components/text/AnimatedSingleLetterText";
import { RootState } from "@/redux/store";

type SelectionTitleProps = {
  title: string;
  children?: ReactNode;
  className?: string;
  whileInView?: boolean;
};

const SectionTitle = ({
  title,
  children,
  className = "",
  whileInView = true,
}: SelectionTitleProps): ReactNode => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <div
      className={`relative flex lg:flex-row flex-col lg:items-end ${layoutProperties.gap.medium} ${theme.foreground} ${className}`}
    >
      <h2 data-testid={title}>
        <AnimatedSingleLetterText
          whileInView={whileInView}
          text={title}
          className={`${layoutProperties.text.large}`}
        />
      </h2>
      {children}
    </div>
  );
};

export default SectionTitle;
