"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useAnimate,
  useMotionValue,
  useTransform,
} from "framer-motion";

const useScreenCenterPosition = () => {
  const [screenCenter, setScreenCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      setScreenCenter({ x, y });
    };

    if (typeof window !== "undefined") {
      handleResize(); // Set initial position
      window.addEventListener("resize", handleResize);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [screenCenter];
};

const ExpandingContainer = ({}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const expandedContainerBounds = {
    width: 70,
    height: 40,
  };

  useEffect(() => {
    setIsCompleted(false);

    const timeout = setTimeout(() => {
      setIsCompleted(true);
    }, animationDuration * 1000);

    return () => clearTimeout(timeout);
  }, [isExpanded]);

  const animationDuration = 0.7;

  return (
    <div className={`relative w-full min-h-[20rem]`}>
      <motion.div
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className={`expanding-container rounded-md flex overflow-hidden flex-col ${
          isExpanded ? "-translate-x-1/2 -translate-y-1/2" : ""
        }  ${!isExpanded && isCompleted ? "z-0" : "z-100"}`}
        style={{
          width: isExpanded ? `${expandedContainerBounds.width}em` : "100%",
          height: isExpanded ? `${expandedContainerBounds.height}em` : "100%",
          left: isExpanded ? "50%" : "0",
          top: isExpanded ? "50%" : "0",
          position: isExpanded ? "fixed" : "absolute",
          borderRadius: isExpanded ? "1rem" : "0.5rem",
        }}
        transition={{
          duration: animationDuration,
          type: "spring",
          bounce: 0.2,
        }}
      >
        <div className={"relative w-full h-full"}>
          <motion.p
            animate={
              isExpanded
                ? {
                    opacity: 1,
                    // y: 0,
                  }
                : {
                    opacity: 0,
                    // y: 20,
                  }
            }
            layout
            style={{
              padding: isExpanded ? "1rem" : "0.5rem",
            }}
            className={
              "absolute top-0 left-0 h-20 w-full text-2xl font-light text-neutral-100 z-[10]"
            }
          >
            Weather app
          </motion.p>

          <div
            className={
              "relative w-full h-full flex items-center justify-center"
            }
          >
            <motion.div
              layout
              animate={
                {
                  // backgroundSize: isExpanded ? "105% 105%" : "100% 100%",
                }
              }
              className={"w-full h-full bg-no-repeat lg:bg-cover"}
              style={{
                backgroundImage: `url('/projects/andwiert/1.png')`,
                // backgroundPosition: isExpanded ? "center" : "cover",
              }}
              transition={{
                duration: animationDuration,
                type: "spring",
                bounce: 0.2,
              }}
            ></motion.div>
            <motion.div
              className={
                "absolute top-0 left-0 w-full h-full bg-black/35 opacity-0"
              }
              animate={isExpanded ? { opacity: 1 } : { opacity: 0 }}
            ></motion.div>
          </div>
        </div>
        <motion.div
          className={
            "bg-neutral-900 overflow-hidden absolute w-full bottom-0 left-0 h-0"
          }
          animate={
            isExpanded
              ? {
                  height: "33%",
                  display: "block",
                }
              : { height: 0, display: "hidden" }
          }
        >
          <p className={"text-gray-100 text-2xl m-4"}>
            Site for deep wells company
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className={`fixed top-0 left-0 w-screen h-screen z-[10] bg-black/70 pointer-events-none opacity-0`}
        animate={{
          transition: animationDuration / 2,
          ...(isExpanded ? { opacity: 1 } : { opacity: 0 }),
        }}
      />
    </div>
  );
};

export default ExpandingContainer;
