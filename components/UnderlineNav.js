"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { animationsTypes } from "@/animations";

const UnderlineNav = ({ items, id, render = (item) => {} }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={"flex h-fit border-b-1 gap-x-2"}>
      {items.map((item, index) => (
        <motion.div
          className={`relative px-2 py-1 flex items-center cursor-pointer`}
          onClick={() => setActiveIndex(index)}
          key={index}
        >
          <span
            className={`${
              index === activeIndex ? `text-purple` : `${theme.foreground}`
            } transition-colors`}
          >
            {render(item)}
          </span>
          {index === activeIndex && (
            <motion.div
              className={`absolute left-0 right-0 bottom-0 h-[.125rem] bg-purple`}
              layoutId={id}
              transition={animationsTypes.default}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default UnderlineNav;
