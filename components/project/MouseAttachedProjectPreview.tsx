"use client";
import React, { MouseEvent } from "react";
import { motion } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FormattedProject } from "@/types/types";

type MouseAttachedProjectPreviewProps = {
  project: FormattedProject;
  shouldBeShown?: boolean;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
};
const MouseAttachedProjectPreview = ({
  project,
  shouldBeShown,
  onClick,
}: MouseAttachedProjectPreviewProps) => {
  const t = useTranslations("HomePage.ProjectsSection.MouseAttachedContainers");
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <>
      <motion.div
        style={{
          backgroundImage: `url(${project.thumbnail})`,
        }}
        className={
          "absolute top-0 left-0 rounded-lg bg-no-repeat bg-contain w-full h-full pointer-events-none bg-center z-[100] cursor-none"
        }
        initial={{ opacity: 1 }}
        animate={{ opacity: !shouldBeShown ? 0 : 1 }}
        exit={{ opacity: 1 }}
        transition={{
          ...animationsTypes.default,
          delay: !shouldBeShown ? 0.5 : 0,
          duration: animationProperties.durations.long,
        }}
      />
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{
          opacity: !shouldBeShown ? 0 : 1,
          scale: !shouldBeShown ? 0.75 : 1,
        }}
        transition={animationsTypes.default}
        className={`absolute border-1 select-none cursor-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center aspect-square w-[5rem] rounded-full bg-purple !z-[1000] ${
          theme.background
        } ${theme.foreground}${!shouldBeShown ? "pointer-events-none" : ""}`}
        onClick={(e) => onClick(e)}
      >
        {t("OnProject")}
      </motion.div>
    </>
  );
};

export default MouseAttachedProjectPreview;
