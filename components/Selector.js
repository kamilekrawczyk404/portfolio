"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "@/components/Icons";
import { AnimatePresence, motion } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";
import { changeSelectorState } from "@/redux/reducers/selectorSlice";

const Selector = ({ items, render = () => {}, callback = () => {} }) => {
  const { theme } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const selectorRef = useRef(null);
  const dropdownRef = useRef(null);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownVariants = {
    initial: {
      y: -10,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
    exit: {
      y: -10,
      opacity: 0,
      transition: {
        staggerChildren: 0.025,
        when: "afterChildren",
        staggerDirection: -1,
        duration: animationProperties.durations.short,
      },
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
    <div
      ref={selectorRef}
      onClick={() => {
        dispatch(changeSelectorState(!isOpen));
        setIsOpen(!isOpen);
      }}
      className={`relative z-[10] flex items-center justify-between border-1 px-2 h-[1.75rem] min-w-[6rem] rounded-xl cursor-pointer ${theme.border}`}
    >
      <span className={"select-none"}>
        {items.length && render(items[selectedIndex])}
      </span>
      <motion.span
        initial={false}
        animate={{ rotate: isOpen ? "180deg" : "0deg" }}
        className={"ml-2 mr-1 origin-center-center"}
      >
        <Icons.CaretDown className={"text-sm"} />
      </motion.span>
      <AnimatePresence mode={"wait"}>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            transition={animationsTypes.default}
            ref={dropdownRef}
            className={`absolute border-1 left-0 top-[calc(100%+.5rem)] p-1 overflow-hidden rounded-xl ${theme.background} bg-gray-100`}
          >
            <ul
              className={
                "max-h-[10rem] overflow-y-scroll flex flex-col gap-y-2 bg-inherit"
              }
            >
              {items.map((item, index) => (
                <motion.li
                  variants={dropdownItemVariants}
                  transition={animationsTypes.default}
                  className={
                    "px-2 h-[1.75rem] flex items-center bg-inherit hover:bg-purple/10 rounded-lg w-full text-nowrap"
                  }
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                >
                  {render(item)}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Selector;
