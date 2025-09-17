"use client";
import React, { useRef } from "react";
import { layoutProperties } from "@/layout";
import ProjectPreview from "@/components/project/ProjectPreview";
import StaggeredList from "@/components/lists/StaggeredList";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useAttachedObjectToCursor from "@/hooks/useAttachedObjectToCursor";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { animationProperties, animationsTypes } from "@/animations";
import { FormattedProject } from "@/types/types";

type ProjectListProps = {
  projects: FormattedProject[];
};

const ProjectsList = ({ projects }: ProjectListProps) => {
  const t = useTranslations("HomePage.ProjectsSection.MouseAttachedContainers");
  const parentRef = useRef<HTMLDivElement | null>(null);
  const attachedToMouseContainerRef = useRef<HTMLDivElement | null>(null);

  const { isAttachedPreviewContainerVisible } = useSelector(
    (state: RootState) => state.projectPreview,
  );
  const { isSelectorOpen } = useSelector((state: RootState) => state.selector);
  const { theme } = useSelector((state: RootState) => state.theme);

  const { isVisible, topOffset, leftOffset } = useAttachedObjectToCursor({
    parent: parentRef,
    target: attachedToMouseContainerRef,
    options: {
      renderWhen: !isSelectorOpen && !isAttachedPreviewContainerVisible,
    },
  });

  return (
    <>
      <div ref={parentRef} className={"relative cursor-none"}>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              ref={attachedToMouseContainerRef}
              className={`absolute !z-[1000] -translate-x-1/2 -translate-y-1/2 selection-none max-w-36 aspect-square flex items-center justify-center text-center p-2 rounded-xl ${theme.background} ${theme.foreground} ${theme.border} border-1`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                scale: 1,
                opacity: 100,
                transition: {
                  scale: {
                    delay: 0.2,
                  },
                  opacity: {
                    delay: 0.2,
                  },
                },
                x: leftOffset,
                y: topOffset,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                ...animationsTypes.default,
                duration: animationProperties.durations.long,
              }}
            >
              {t("OnList")}
            </motion.div>
          )}
        </AnimatePresence>
        <StaggeredList
          className={`grid md:grid-cols-2 grid-cols-1 ${layoutProperties.gap.horizontal.large}`}
          items={projects}
          render={(project) => (
            <ProjectPreview project={project} dataTestId={"project-preview"} />
          )}
        />
      </div>
    </>
  );
};

export default ProjectsList;
