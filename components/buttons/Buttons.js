"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ExpandingContainer from "@/app/components/ExpandingContainer";

const Buttons = () => {
  const indexes = [1, 2, 3, 4];

  const variants = {
    initial: { opacity: 0, scale: 0.5, height: 0 },
    exit: { opacity: 0, scale: 0.5, height: 0 },
    animate: (index) => ({
      opacity: 1,
      height: "auto",
      scale: 1,
      transition: {
        delay: index * 0.1,
        type: "spring",
        bounce: 0.5,
      },
    }),
  };

  const parentVariants = {
    initial: {
      opacity: 0,
      height: 0,
    },
    animate: {
      opacity: 1,
      height: "auto",
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      overflow: "hidden",
      transition: {
        staggerChildren: 0.1,
        direction: -1,
        when: "afterChildren",
      },
    },
  };

  const childVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20 },
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={
        "relative w-full h-full flex flex-col items-center justify-center"
      }
    >
      <div className={"flex flex-col gap-4 bg-gray-400/50 p-4 rounded-xl "}>
        <AnimatePresence mode={"wait"}>
          {isVisible && (
            <motion.div
              className={
                "flex flex-col items-center justify-center gap-2 w-full"
              }
              variants={parentVariants}
              initial={"initial"}
              animate={"animate"}
              exit={"exit"}
            >
              {indexes.map((index) => (
                <motion.button
                  key={index}
                  variants={childVariants}
                  // initial={"initial"}
                  // animate={"animate"}
                  // custom={index}
                  className={"bg-gray-700 text-gray-100 py-1 px-3 rounded-lg"}
                >
                  Button {index}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05, outline: "0px solid #fff" }}
          whileTap={{ scale: 0.95, outline: "2px solid #fff" }}
          transition={{ duration: 0.2 }}
          className={
            "p-2 bg-orange-500 rounded-lg shadow-md text-gray-700 min-w-[150px] "
          }
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? "Hide Buttons" : "Show Buttons"}
        </motion.button>
      </div>

      <div
        className={"grid grid-cols-2 gap-2 p-2 rounded-lg bg-gray-400 w-3/4"}
      >
        {indexes.map((index) => (
          <ExpandingContainer key={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default Buttons;
