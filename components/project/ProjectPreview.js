"use client";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "@/components/Backdrop";
import { animationProperties, animationsTypes } from "@/animations";
import MouseAttachedProjectPreview from "@/components/project/MouseAttachedProjectPreview";
import Project from "@/components/project/Project";

const ProjectPreview = ({ project, mousePosition }) => {
  const { isSelectorOpen } = useSelector((state) => state.selector);

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
      className={"border-t-1 min-h-[20rem] flex items-center relative"}
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
              onClose={() => setIsExpanded(false)}
            />

            {/*Preview that follows user mouse position*/}
            <MouseAttachedProjectPreview
              shouldBeShown={!isExpanded}
              project={project}
              onClick={() => setIsExpanded(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/*<ExpandingContainer*/}
      {/*  isExpanded={isExpanded}*/}
      {/*  setIsExpanded={setIsExpanded}*/}
      {/*  project={project}*/}
      {/*/>*/}

      <h3 className={"text-4xl select-none"}>{project.title}</h3>
    </motion.div>
  );
};

export default ProjectPreview;
