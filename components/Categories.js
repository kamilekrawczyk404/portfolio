"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedCheckbox from "@/components/AnimatedCheckbox";
import { useSelector } from "react-redux";
import {
  animationProperties,
  animationsTypes,
  variantsPresets,
} from "@/animations";
import FiltersRemover from "@/components/buttons/FiltersRemover";

const Categories = ({
  categories,
  callback = () => {},
  render = () => {},
  defaultSelectedIndex = -1,
  delay = 0,
  singleSelection = false,
  whileInView = false,
  className = "",
}) => {
  const { theme } = useSelector((state) => state.theme);

  const [selectedIds, setSelectedIds] = useState(
    [...categories].map((_, index) => index === defaultSelectedIndex),
  );

  const [isRemoverVisible, setIsRemoverVisible] = useState(false);

  const onCategoryClicked = useCallback(
    (clickedIndex) => {
      if (singleSelection) {
        if (clickedIndex === selectedIds.indexOf(true)) return;
        setSelectedIds((prev) =>
          prev.map((_, index) => index === clickedIndex),
        );
      } else {
        setSelectedIds((prev) =>
          prev.toSpliced(clickedIndex, 1, !prev[clickedIndex]),
        );
      }
    },
    [selectedIds],
  );

  const { parent, children } = variantsPresets.staggered({ delay });

  useEffect(() => {
    const selected = categories.filter((item, index) => selectedIds[index]);

    // Return list of updated categories
    callback(selected);

    // Handle remover visibility
    setIsRemoverVisible(selected.length > 1);
  }, [selectedIds]);

  return (
    <motion.div
      viewport={{ once: true }}
      whileInView={whileInView ? "animate" : {}}
      transition={{ delay }}
      variants={parent}
      initial={"initial"}
      animate={!whileInView ? "animate" : {}}
      exit={"exit"}
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {categories.map((item, index) => (
        <motion.div
          variants={children}
          key={index}
          className={`flex items-center relative border-1 rounded-xl h-[1.75rem] cursor-pointer transition-colors overflow-hidden ${
            selectedIds[index]
              ? "border-purple text-purple bg-purple/10"
              : `${theme.border}`
          }`}
          onClick={() => onCategoryClicked(index)}
        >
          <AnimatePresence mode={"wait"}>
            {selectedIds[index] && (
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
                <AnimatedCheckbox isChecked={[selectedIds[index]]} />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.span
            initial={false}
            animate={{ paddingLeft: selectedIds[index] ? 0 : ".5rem" }}
            transition={{
              ...animationsTypes.default,
              duration: animationProperties.durations.short,
            }}
            className={"select-none pr-2 text-nowrap"}
          >
            {render(item)}
          </motion.span>
        </motion.div>
      ))}
      <AnimatePresence mode={"wait"}>
        {isRemoverVisible && (
          <FiltersRemover
            callback={() => setSelectedIds((prev) => prev.map((i) => false))}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Categories;
