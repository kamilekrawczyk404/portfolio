"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedCheckbox from "@/components/AnimatedCheckbox";
import { useSelector } from "react-redux";
import { animationProperties, animationsTypes } from "@/animations";

const Categories = ({
  categories,
  callback = () => {},
  render = () => {},
  singleSelection = false,
  defaultSelectedIndex = null,
  className = "",
}) => {
  const { theme } = useSelector((state) => state.theme);

  const [items, setItems] = useState(
    [...categories].map((item, index) => ({
      ...item,
      selected:
        defaultSelectedIndex !== null ? index === defaultSelectedIndex : false,
    })),
  );

  const onCategoryClicked = useCallback((clickedIndex) => {
    setItems((prevItems) => {
      // Create a new array with the selected state toggled for the clicked item
      const updatedItems = prevItems.map((item, i) => ({
        ...item,
        // Toggle 'selected' for the clicked item, keep others as they are
        // For single selection only one category is selected on current moment
        // When one is already selected, clicking on another will unselect the previous one and select the new one
        selected: singleSelection
          ? i === clickedIndex
          : i === clickedIndex
            ? !item.selected
            : item.selected,
      }));
      return updatedItems;
    });
  }, []);

  useEffect(() => {
    // Return list of updated categories
    callback(items.filter((item) => item.selected));
  }, [items]);

  return (
    <div className={`flex flex-wrap gap-2`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex items-center relative border-1 rounded-xl h-[1.75rem] cursor-pointer transition-colors overflow-hidden ${
            item.selected
              ? "border-purple text-purple bg-purple/10"
              : `${theme.border}`
          }`}
          onClick={() => onCategoryClicked(index)}
        >
          <AnimatePresence mode={"wait"}>
            {item.selected && (
              <motion.div
                initial={{ width: 0, marginLeft: 0 }}
                animate={{ width: "1.5rem", marginLeft: ".25rem" }}
                exit={{ width: 0, marginLeft: 0, transition: { delay: 0 } }}
                transition={{
                  ...animationsTypes.default,
                  duration: animationProperties.durations.short,
                }}
                className={"overflow-hidden flex items-center justify-center"}
              >
                <AnimatedCheckbox isChecked={item.selected} />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.span
            initial={false}
            animate={{ paddingLeft: item.selected ? 0 : ".5rem" }}
            transition={{
              ...animationsTypes.default,
              duration: animationProperties.durations.short,
            }}
            className={"select-none pr-2 text-nowrap"}
          >
            {render(item)}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
