"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { layoutProperties } from "@/layout";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RootState } from "@/redux/store";
import { animationProperties, animationsTypes } from "@/animations";
import { Theme, ThemeTypes } from "@/redux/reducers/themeSlice";

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
      className={`flex items-center border-1 rounded-full overflow-x-scroll max-w-full no-scrollbar ${theme.borderSecondary} ${className}`}
    >
      {items.map((item, index) => (
        <button
          key={index}
          className={`cursor-pointer relative inline-block lg:px-6 px-4 lg:py-4 py-2 py-1 transition-colors text-nowrap ${
            theme.borderSecondary
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
          <div
            className={`flex items-center justify-center ${
              index === selectedItemIndex ? getMixBlendClassName(selected) : ""
            }`}
          >
            {render(item)}
          </div>
        </button>
      ))}
    </motion.div>
  );
};

export const getMixBlendClassName = (
  selected: ThemeTypes,
  invert: boolean = false,
): string => {
  if (selected === "dark") {
    return invert ? "mix-blend-exclusion" : "mix-blend-multiply";
  }
  return invert ? "mix-blend-multiply" : "mix-blend-exclusion";
};

export default SegmentedControl;
