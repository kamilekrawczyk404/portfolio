"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedCheckbox from "@/components/AnimatedCheckbox";
import { useSelector } from "react-redux";
import { animationProperties, animationsTypes } from "@/animations";

const Categories = ({ categories, callback = () => {}, className = "" }) => {
  const { theme } = useSelector((state) => state.theme);

  const [items, setItems] = useState(
    [...categories].map((item) => ({
      ...item,
      selected: false,
    })),
  );

  const onCategoryClicked = useCallback((clickedIndex) => {
    setItems((prevItems) => {
      // Create a new array with the selected state toggled for the clicked item
      const updatedItems = prevItems.map((item, i) => ({
        ...item,
        // Toggle 'selected' for the clicked item, keep others as they are
        selected: i === clickedIndex ? !item.selected : item.selected,
      }));
      return updatedItems;
    });
  }, []);

  // useEffect(() => {
  // callback(items);
  // }, [items]);

  console.log("items", items);

  return (
    <div className={"flex gap-x-2 "}>
      {items.map((item, index) => (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={animationsTypes.default}
          key={index}
          className={`flex items-center relative border-1 rounded-full h-[1.75rem] cursor-pointer transition-colors ${
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
                animate={{ width: "1.75rem", marginLeft: ".25rem" }}
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
            className={"select-none pr-2"}
          >
            {item.name}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
};

export default Categories;
