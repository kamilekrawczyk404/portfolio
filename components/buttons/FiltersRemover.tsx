"use client";
import React, { MouseEvent } from "react";
import { motion } from "framer-motion";
import { Icons } from "@/components/Icons";
import { useSelector } from "react-redux";
import { animationsTypes } from "@/animations";
import { RootState } from "@/redux/store";

type FiltersRemoverProps = {
  callback: (e: MouseEvent<HTMLButtonElement>) => void;
};

const FiltersRemover = ({ callback }: FiltersRemoverProps) => {
  const { opposite, theme } = useSelector((state: RootState) => state.theme);

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
        onClick={(e) => callback(e)}
        className={`px-2 flex items-center gap-x-1 border-1 h-[1.75rem] rounded-xl text-red-600 hover:bg-red-700/10 transition-colors cursor-pointer ${theme.border}`}
      >
        <Icons.Trash className={"text-sm"} />
        <span>Remove filters</span>
      </button>
    </motion.div>
  );
};

export default FiltersRemover;
