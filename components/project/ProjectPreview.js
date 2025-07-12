"use client";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "@/components/Backdrop";
import { animationProperties, animationsTypes } from "@/animations";
import MouseAttachedProjectPreview from "@/components/project/MouseAttachedProjectPreview";
import Project from "@/components/project/Project";
import useMousePosition from "@/hooks/useMousePosition";
import { setIsPreviewOpen } from "@/redux/reducers/projectPreviewSlice";
import StaggeredList from "@/components/lists/StaggeredList";
import LanguageUsageStats from "@/components/project/LanguageUsageStats";
import { layoutProperties } from "@/layout";

const ProjectPreview = ({ project }) => {
  const { isSelectorOpen } = useSelector((state) => state.selector);
  const { theme } = useSelector((state) => state.theme);
  const { isPreviewOpen } = useSelector((state) => state.projectPreview);

  const dispatch = useDispatch();

  const mousePosition = useMousePosition();

  const containerRef = useRef(null);
  const previewRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const getLeftOffset = () =>
    mousePosition.x -
    (containerRef?.current?.getBoundingClientRect()?.left || 0);

  const getTopOffset = () =>
    mousePosition.y -
    (containerRef?.current?.getBoundingClientRect()?.top || 0);

  useEffect(() => {
    const { top, left, width, height } =
      containerRef.current.getBoundingClientRect();

    if (
      !isPreviewOpen &&
      !isSelectorOpen &&
      !isExpanded &&
      mousePosition.x >= left &&
      mousePosition.x <= left + width &&
      mousePosition.y >= top &&
      mousePosition.y <= top + height
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [mousePosition, containerRef, previewRef, isExpanded]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative border-t-1 h-[20rem] min-h-[15rem] flex flex-col justify-between relative ${layoutProperties.gap.large} ${layoutProperties.padding} ${theme.border}`}
    >
      <Backdrop isActive={isExpanded} blur />

      <AnimatePresence mode={"wait"}>
        {(isVisible || isExpanded) && (
          <motion.div
            layout
            ref={previewRef}
            initial={{ opacity: 0, scale: 0.9 }}
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
              x: isExpanded ? null : getLeftOffset(),
              y: isExpanded ? null : getTopOffset(),
            }}
            style={{
              left: isExpanded ? "50%" : 0,
              top: isExpanded ? "50%" : 0,
              width: isExpanded ? `calc(100vw - 10%)` : "30vw",
              height: isExpanded ? `calc(100dvh - 10%)` : "30vh",
              minHeight: "12rem",
              position: isExpanded ? "fixed" : "absolute",
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            className={`absolute !z-[1000] rounded-xl border-1 -translate-x-1/2 -translate-y-1/2 overflow-hidden sm:max-h-fit min-h-[30rem] max-h-[75vh] min-w-[20rem]`}
            transition={{
              ...animationsTypes.default,
              duration: animationProperties.durations.long,
            }}
          >
            {/*View that will appear after user click the preview*/}
            <Project
              project={project}
              shouldBeShown={isExpanded}
              onClose={() => {
                setIsExpanded(false);
                dispatch(setIsPreviewOpen(false));
              }}
            />

            {/*Preview that follows user mouse position*/}
            <MouseAttachedProjectPreview
              shouldBeShown={!isExpanded}
              project={project}
              onClick={() => {
                setIsExpanded(true);
                dispatch(setIsPreviewOpen(true));
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/*List item body*/}
      <h3
        className={`select-none ${theme.foreground} ${layoutProperties.text.medium}`}
      >
        {project.title}
      </h3>
      <LanguageUsageStats languages={project.repository.languages || []} />
    </motion.div>
  );
};

export default ProjectPreview;
