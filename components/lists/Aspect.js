"use client";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Aspect = ({ name, icon = null, ...props }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <motion.div
      className={`min-h-[1.75rem] rounded-xl px-2 py-[.125rem] flex items-center gap-x-2 border-1 text-sm ${theme.border} ${theme.background} ${theme.foreground}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {name}
    </motion.div>
  );
};

export default Aspect;
