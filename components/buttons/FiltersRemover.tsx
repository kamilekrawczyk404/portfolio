"use client";
import React, { MouseEvent } from "react";
import { motion } from "framer-motion";
import { Icons } from "@/components/Icons";
import { animationsTypes } from "@/animations";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type FiltersRemoverProps = {
  callback: (e: MouseEvent<HTMLButtonElement>) => void;
};

const FiltersRemover = ({ callback }: FiltersRemoverProps) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={animationsTypes.default}
      onClick={(e) => callback(e)}
      className={`flex items-center gap-x-1 h-[1.75rem] px-2 shadow-sm rounded-xl text-red-600 hover:text-red-500 transition-colors cursor-pointer ${theme.backgroundLight}`}
    >
      <Icons.Trash className={"text-sm"} />
      <span>Remove filters</span>
    </motion.button>
  );
};

export default FiltersRemover;
