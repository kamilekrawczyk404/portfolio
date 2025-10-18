"use client";
import React, { ReactNode } from "react";
import { layoutProperties } from "@/layout";
import { useSelector } from "react-redux";
import AnimatedSingleLetterText from "@/components/text/AnimatedSingleLetterText";
import { RootState } from "@/redux/store";
import { animationProperties, variantsPresets } from "@/animations";
import { motion } from "framer-motion";

type SelectionTitleProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  titleContainerClassName?: string;
  whileInView?: boolean;
  onTitleAnimationComplete?: (animationCompleteTime: number) => any;
};

const SectionTitle = ({
  title,
  children,
  description,
  className = "",
  titleContainerClassName = "",
  whileInView = true,
  onTitleAnimationComplete,
}: SelectionTitleProps): ReactNode => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const variants = variantsPresets.appearing({
    delay: animationProperties.durations.medium,
  });

  return (
    <div className={`relative flex flex-col ${theme.foreground} ${className}`}>
      <div
        className={`flex flex-col items-center lg:mb-8 mb-6 ${layoutProperties.gap.extraSmall} ${titleContainerClassName}`}
      >
        <h2 data-testid={title}>
          <AnimatedSingleLetterText
            whileInView={whileInView}
            text={title}
            className={`${layoutProperties.text.extraLarge} font-light`}
            onAnimationComplete={onTitleAnimationComplete}
          />
        </h2>
        {description && (
          <motion.p
            viewport={{ once: true }}
            variants={variants}
            whileInView={whileInView ? { ...variants.animate } : {}}
            initial={"initial"}
            exit={"exit"}
            className={`${layoutProperties.text.large} text-neutral-500 lg:max-w-2/3 text-center`}
          >
            {description}
          </motion.p>
        )}
      </div>
      {children}
    </div>
  );
};

export default SectionTitle;
