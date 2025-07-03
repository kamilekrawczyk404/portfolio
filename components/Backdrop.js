"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Backdrop = ({ isActive }) => {
  return (
    // <AnimatePresence mode={"popLayout"}>
    isActive && (
      <motion.div
        className={"fixed top-0 left-0 bg-black/50 w-screen h-screen"}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.4,
          delay: !isActive ? 0.2 : 0,
        }}
      ></motion.div>
    )
    // </AnimatePresence>
  );
};

export default Backdrop;
