"use client";
import React, { JSX, ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "@/components/Icons";
import { AnimatePresence, motion } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";
import { changeSelectorState } from "@/redux/reducers/selectorSlice";
import { RootState } from "@/redux/store";

type SelectorProps<T> = {
  items: T[];
  render: (item: T) => ReactNode;
  callback: (item: T) => void;
  delay?: number;
  whileInView: boolean;
  disabled?: boolean;
  dataTestId?: string;
};

const Selector = <T extends unknown>({
  items,
  render,
  callback,
  disabled,
  delay = 0,
  dataTestId,
  whileInView = false,
}: SelectorProps<T>): JSX.Element => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const dispatch = useDispatch();

  const selectorRef = useRef(null);
  const dropdownRef = useRef(null);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownVariants = {
    initial: {
      y: -10,
      opacity: 0,
      scale: 0.975,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren",
        delay,
      },
      scale: 1,
    },
    exit: {
      y: -10,
      opacity: 0,
      transition: {
        staggerChildren: 0.025,
        when: "beforeChildren",
        staggerDirection: -1,
        duration: animationProperties.durations.short,
      },
      scale: 0.975,
    },
  };

  const dropdownItemVariants = {
    initial: { y: -10, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: { y: -10, opacity: 0 },
  };

  useEffect(() => {
    const listener = (e) => {
      if (
        isOpen &&
        selectorRef.current &&
        dropdownRef.current &&
        !selectorRef.current.contains(e.target) &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        dispatch(changeSelectorState(false));
      }
    };

    window.addEventListener("click", listener);

    return () => window.removeEventListener("click", listener);
  }, [isOpen, selectorRef, dropdownRef]);

  useEffect(() => {
    callback(items[selectedIndex]);
  }, [selectedIndex]);

  return (
    <motion.div
      data-testid={dataTestId}
      ref={selectorRef}
      viewport={{ once: true }}
      initial={{ opacity: 0 }}
      whileInView={whileInView ? { opacity: 1 } : {}}
      animate={!whileInView ? { opacity: 1 } : {}}
      transition={{ delay: 1.75 * delay }}
      onClick={() => {
        if (disabled) return;

        dispatch(changeSelectorState(!isOpen));
        setIsOpen(!isOpen);
      }}
      className={`relative z-[10] flex items-center justify-between px-2 min-h-10 min-w-[6rem] shadow-md rounded-lg cursor-pointer ${theme.backgroundLight}`}
    >
      <span className={`select-none flex-inline items-center`}>
        {items.length && render(items[selectedIndex])}
      </span>
      <span className={"mr-1 ml-2 origin-center-center"}>
        <Icons.CaretDown className={"text-sm text-neutral-500"} />
      </span>
      <AnimatePresence mode={"wait"}>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            transition={animationsTypes.default}
            ref={dropdownRef}
            className={`absolute left-0 min-w-full top-[calc(100%+.5rem)] shadow-md overflow-hidden rounded-lg ${theme.backgroundLight} ${theme.border}`}
          >
            <ul
              className={
                "max-h-[10rem] overflow-y-scroll flex flex-col gap-y-2 bg-inherit p-1"
              }
            >
              {items.map((item, index) => (
                <motion.li
                  variants={dropdownItemVariants}
                  transition={animationsTypes.default}
                  className={`h-[1.75rem] px-2 py-1 flex items-center bg-inherit rounded-md w-fit text-nowrap transition-colors text-xs ${theme.hover.backgroundLight}`}
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className={"w-4"}>
                    {index === selectedIndex && <Icons.Check />}
                  </div>
                  {render(item)}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Selector;
