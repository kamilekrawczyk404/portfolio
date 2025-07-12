"use client";
import React from "react";
import { motion } from "framer-motion";
import { Icons } from "@/components/Icons";
import { useSelector } from "react-redux";
import { animationsTypes } from "@/animations";

const FiltersRemover = ({ callback }) => {
  const { opposite } = useSelector((state) => state.theme);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={animationsTypes.default}
      className={"relative flex gap-x-2"}
    >
      <div className={`w-[1px] h-full ${opposite.background}`} />
      <button
        onClick={callback}
        className={
          "px-2 border-red-500 flex items-center gap-x-1 border-1 border-red-500 h-[1.75rem] rounded-xl text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
        }
      >
        <Icons.Trash className={"text-sm"} />
        <span>Remove filters</span>
      </button>
    </motion.div>
  );
};

export default FiltersRemover;
