"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Backdrop = ({ isActive }) => {
  return (
    isActive && (
      <motion.div
        className={"fixed top-0 left-0 bg-black/50 w-screen h-screen z-[100]"}
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
  );
};

export default Backdrop;
