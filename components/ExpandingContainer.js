"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseButton from "@/components/buttons/CloseButton";
import { useSelector } from "react-redux";
import GroupSection from "@/components/GroupSection";
import Aspect from "@/components/lists/Aspect";
import StaggeredList from "@/components/lists/StaggeredList";
import UnderlineNav from "@/components/navigation/UnderlineNav";
import { animationProperties, animationsTypes } from "@/animations";
import Gallery from "@/components/gallery/Gallery";

const ExpandingContainer = ({ isExpanded, setIsExpanded, project }) => {
  const { theme, opposite } = useSelector((state) => state.theme);

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setIsCompleted(false);

    const timeout = setTimeout(() => {
      setIsCompleted(true);
    }, animationDuration * 1000);

    return () => clearTimeout(timeout);
  }, [isExpanded]);

  const animationDuration = 0.7;

  return (
    <AnimatePresence>
      <motion.div
        layout
        className={`rounded-md flex overflow-hidden flex-col ${
          isExpanded ? "-translate-x-1/2 -translate-y-[calc(50%-2rem)]" : ""
        }  ${!isExpanded && isCompleted ? "z-0" : "z-100"}`}
        style={{
          width: isExpanded ? `calc(100vw - 10%)` : "100%",
          height: isExpanded ? `calc(100dvh - 8rem)` : "20rem",
          minHeight: "30rem",
          left: isExpanded ? "50%" : "0",
          top: isExpanded ? "50%" : "0",
          position: isExpanded ? "fixed" : "absolute",
          borderRadius: isExpanded ? "1rem" : "0.5rem",
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
          type: "spring",
          bounce: 0.2,
        }}
      ></motion.div>
    </AnimatePresence>
  );
};

export default ExpandingContainer;
