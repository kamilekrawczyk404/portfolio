"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { animationsTypes } from "@/animations";

const UnderlineNav = ({
  items,
  id,
  renderNavigationHeader = () => {},
  renderView = () => {},
  initialActiveIndex = 0,
  canRender = true,
}) => {
  const { theme } = useSelector((state) => state.theme);

  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  // 1: Left to Right (new item comes from right, old item exits left)
  // -1: Right to Left (new item comes from left, old item exits right)
  const [carouselDirection, setCarouselDirection] = useState(1);

  const navigationItemsRefs = useRef([]);

  // Variants for carousel content animation
  const carouselVariants = {
    // Initial state depends on direction: comes from right (100%) or left (-100%)
    initial: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        ...animationsTypes.default,
      },
    },
    // Exit state depends on direction: exits left (-100%) or right (100%)
    exit: (direction) => ({
      x: direction < 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        ...animationsTypes.default,
      },
    }),
  };

  useEffect(() => {
    if (canRender && activeIndex !== -1) {
      navigationItemsRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
    }
  }, [activeIndex]);

  return (
    <div className={"relative w-full h-full flex flex-col"}>
      <div
        className={`flex overflow-x-scroll h-fit border-b-1 gap-x-2 ${theme.border}`}
      >
        {items.map((item, index) => (
          <motion.div
            ref={(el) => (navigationItemsRefs.current[index] = el)}
            className={`relative px-2 py-1 flex items-center cursor-pointer`}
            onClick={() => {
              // Determine direction based on current and new active index
              setCarouselDirection(index > activeIndex ? 1 : -1);
              setActiveIndex(index);
            }}
            key={index}
          >
            <span
              className={`${
                index === activeIndex ? `text-purple` : `${theme.foreground}`
              } transition-colors text-nowrap`}
            >
              {renderNavigationHeader(item.type)}
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
      <div className={"relative w-full h-full overflow-hidden"}>
        <AnimatePresence mode={"sync"} custom={carouselDirection}>
          {canRender && items[activeIndex] && (
            <motion.div
              key={activeIndex}
              variants={carouselVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={carouselDirection}
              className={"absolute left-0 top-0 w-full h-full flex"}
            >
              {renderView(items[activeIndex])}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UnderlineNav;
