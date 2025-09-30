"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { layoutProperties } from "@/layout";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RootState } from "@/redux/store";
import { animationProperties, animationsTypes } from "@/animations";

type SegmentedControlProps<T> = {
  items: T[];
  render: (item: T) => ReactNode;
  onItemSelect: (index: number) => any;
  layoutId: string;
  className?: string;
};

const SegmentedControl = <T extends unknown>({
  items,
  render,
  onItemSelect,
  layoutId,
  className = "",
}: SegmentedControlProps<T>) => {
  const { theme, opposite, selected } = useSelector(
    (state: RootState) => state.theme,
  );
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);

  useEffect(() => {
    onItemSelect(selectedItemIndex);
  }, [selectedItemIndex]);

  return (
    <motion.div
      className={`flex items-center border-1 rounded-full overflow-hidden w-fit ${theme.border} ${className}`}
    >
      {items.map((item, index) => (
        <button
          tabIndex={-1}
          key={index}
          className={`relative inline-block lg:px-6 px-4 px-1 lg:py-4 md:py-2 py-1 transition-colors ${
            theme.border
          } ${
            index === selectedItemIndex
              ? `${opposite.foreground}`
              : `${theme.foreground}`
          } ${index < items.length - 1 ? "border-r-1" : ""}`}
          onClick={() => setSelectedItemIndex(index)}
        >
          {index === selectedItemIndex && (
            <motion.span
              className={`absolute inset-0 ${opposite.background}`}
              layoutId={layoutId}
              transition={animationsTypes.default}
            />
          )}
          <span
            className={`${
              index === selectedItemIndex
                ? selected === "dark"
                  ? "mix-blend-multiply"
                  : "mix-blend-exclusion"
                : ""
            }`}
          >
            {render(item)}
          </span>
        </button>
      ))}
    </motion.div>
  );
};

export default SegmentedControl;
