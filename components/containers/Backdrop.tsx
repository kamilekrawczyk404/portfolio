"use client";
import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type BackdropProps = {
  isActive: boolean;
  blur?: boolean;
};

const Backdrop = ({ isActive, blur = false }: BackdropProps): ReactNode => {
  return (
    <AnimatePresence mode={"sync"}>
      {isActive && (
        <motion.div
          className={`fixed top-0 left-0 bg-black/50 w-full h-screen z-[1000] ${
            blur ? "backdrop-blur-xs" : ""
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
      )}
    </AnimatePresence>
  );
};

export default Backdrop;
