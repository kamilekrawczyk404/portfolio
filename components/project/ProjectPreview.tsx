"use client";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";
import MouseAttachedProjectPreview from "@/components/project/MouseAttachedProjectPreview";
import Project from "@/components/project/Project";
import {
  setCanPreviewBeVisible,
  setIsAttachedPreviewContainerVisible,
  setIsProjectVisible,
} from "@/redux/reducers/projectPreviewSlice";
import LanguageUsageStats from "@/components/project/LanguageUsageStats";
import { layoutProperties } from "@/layout";
import { useTranslations } from "next-intl";
import Backdrop from "@/components/containers/Backdrop";
import { RootState } from "@/redux/store";
import useAttachedObjectToCursor from "@/hooks/useAttachedObjectToCursor";
import { FormattedProject } from "@/types/types";

const MARGIN = 50;

type ProjectPreviewProps = {
  project: FormattedProject;
  dataTestId?: string;
};

const ProjectPreview = ({ project, dataTestId }: ProjectPreviewProps) => {
  const t = useTranslations("HomePage.ProjectsSection.Projects");

  const { theme } = useSelector((state: RootState) => state.theme);
  const { isSelectorOpen } = useSelector((state: RootState) => state.selector);
  const { canPreviewBeVisible } = useSelector(
    (state: RootState) => state.projectPreview,
  );

  const dispatch = useDispatch();

  const containerRef = useRef(null);
  const previewRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { isVisible, leftOffset, topOffset } = useAttachedObjectToCursor({
    parent: containerRef,
    target: previewRef,
    options: {
      renderWhen: canPreviewBeVisible && !isSelectorOpen && !isExpanded,
      margin: MARGIN,
    },
    onEnter: () => dispatch(setIsAttachedPreviewContainerVisible(true)),
    onLeave: () => dispatch(setIsAttachedPreviewContainerVisible(false)),
  });

  return (
    <motion.div
      data-testid={dataTestId}
      ref={containerRef}
      className={`relative border-t-1 h-[20rem] min-h-[15rem] flex flex-col justify-between relative ${layoutProperties.gap.large} ${layoutProperties.padding} ${theme.border}`}
    >
      <Backdrop isActive={isExpanded} blur />

      <AnimatePresence mode={"wait"}>
        {(isVisible || isExpanded) && (
          <motion.div
            layout
            ref={previewRef}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                scale: {
                  delay: 0.2,
                },
                opacity: {
                  delay: 0.2,
                },
              },
              x: isExpanded ? null : leftOffset,
              y: isExpanded ? null : topOffset,
            }}
            style={{
              left: isExpanded ? "50%" : 0,
              top: isExpanded ? "50%" : 0,
              width: isExpanded ? `calc(100vw - 10%)` : "30vw",
              height: isExpanded ? `calc(100dvh - 10%)` : "30vh",
              minHeight: "12rem",
              position: isExpanded ? "fixed" : "absolute",
              cursor: isVisible ? "none" : "default",
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
            }}
            className={`absolute !z-[1000] rounded-xl border-1 -translate-x-1/2 -translate-y-1/2 overflow-hidden sm:max-h-fit min-h-[30rem] max-h-[100vh] min-w-[20rem] ${theme.border}`}
            transition={{
              ...animationsTypes.default,
              duration: animationProperties.durations.long,
            }}
          >
            {/*View that will appear after user click the preview*/}
            <Project
              dataTestId={"expanded-project-preview"}
              project={project}
              shouldBeShown={isExpanded}
              onClose={() => {
                setIsExpanded(false);
                dispatch(setCanPreviewBeVisible(true));
                dispatch(setIsProjectVisible(false));
              }}
            />

            {/*Preview that follows user mouse position*/}
            <MouseAttachedProjectPreview
              dataTestId={"project-preview-button"}
              shouldBeShown={!isExpanded}
              project={project}
              onClick={(e) => {
                e.stopPropagation();

                setIsExpanded(true);
                dispatch(setCanPreviewBeVisible(false));
                dispatch(setIsProjectVisible(true));
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/*List item body*/}
      <h3
        className={`select-none ${theme.foreground} ${layoutProperties.text.medium}`}
      >
        {t(`${project.githubRepoName}.Title`)}
      </h3>
      <LanguageUsageStats languages={project.repository.languages} />
    </motion.div>
  );
};

export default ProjectPreview;
