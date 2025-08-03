"use client";
import React from "react";
import { motion } from "framer-motion";

const Backdrop = ({ isActive, blur = false }) => {
  return (
    isActive && (
      <motion.div
        className={`fixed top-0 left-0 bg-black/50 w-full h-screen z-[1000] ${
          blur ? "backdrop-blur-sm" : ""
        }`}
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
