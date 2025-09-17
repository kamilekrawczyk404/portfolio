"use client";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import AnimatedCheckbox from "@/components/AnimatedCheckbox";
import { useSelector } from "react-redux";
import {
  animationProperties,
  animationsTypes,
  variantsPresets,
} from "@/animations";
import FiltersRemover from "@/components/buttons/FiltersRemover";
import { layoutProperties } from "@/layout";
import { RootState } from "@/redux/store";

type CategoriesProps<T> = {
  categories: T[];
  callback: (items: T[]) => void;
  render: (item: T) => ReactNode;
  defaultSelectedIndex?: number;
  delay?: number;
  singleSelection?: boolean;
  whileInView?: boolean;
  className?: string;
};

const Categories = <T extends unknown>({
  categories,
  callback,
  render,
  defaultSelectedIndex = -1,
  delay = 0,
  singleSelection = false,
  whileInView = false,
  className = "",
}: CategoriesProps<T>) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const [selectedIds, setSelectedIds] = useState<boolean[]>([]);
  const [isRemoverVisible, setIsRemoverVisible] = useState(false);

  const { parent, children } = variantsPresets.staggered({ delay });

  const onCategoryClicked = useCallback(
    (clickedIndex: number) => {
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
    [singleSelection, selectedIds],
  );

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedIds(
        [...categories].map((_, index) => index === defaultSelectedIndex),
      );
    } else {
      setSelectedIds([]);
    }
  }, [categories, defaultSelectedIndex]);

  useEffect(() => {
    const selected = categories.filter((_, index) => selectedIds[index]);

    callback(selected);

    setIsRemoverVisible(selected.length > 1);
  }, [selectedIds, categories, callback]);

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
        <motion.button
          variants={children}
          key={index}
          className={`flex items-center relative border-1 rounded-xl h-[1.75rem] cursor-pointer transition-colors overflow-hidden ${
            selectedIds[index]
              ? "border-purple text-purple bg-purple/10"
              : `${theme.border}`
          }`}
          onClick={() => onCategoryClicked(index)}
        >
          <AnimatePresence>
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
                <AnimatedCheckbox isChecked={selectedIds[index]} />
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
            className={`select-none pr-2 text-nowrap ${layoutProperties.text.extraSmall}`}
          >
            {render(item)}
          </motion.span>
        </motion.button>
      ))}
      <AnimatePresence mode={"wait"}>
        {isRemoverVisible && (
          <FiltersRemover
            callback={() => setSelectedIds((prev) => prev.map((_) => false))}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Categories;
