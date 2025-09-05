"use client";
import React, { useEffect, useState } from "react";
import { colors } from "@/layout";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  animationProperties,
  animationsTypes,
  animationsTypes as animationTypes,
} from "@/animations";
import { RootState } from "@/redux/store";

type TextCarouselProps = {
  words: string[];
  delay?: number;
  duration?: number;
  className?: string;
  shouldRender?: boolean;
};

const backgroundColors = [colors.purple, colors.orange];

const TextCarousel = ({
  words,
  delay = 0,
  duration = 3,
  className = "",
  shouldRender = true,
}: TextCarouselProps) => {
  const { opposite } = useSelector((state: RootState) => state.theme);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsStarted(true);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isStarted]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1 === words.length ? 0 : prev + 1));
      setCurrentColorIndex((prev) =>
        prev + 1 === backgroundColors.length ? 0 : prev + 1,
      );
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [currentWordIndex, currentColorIndex]);

  return (
    <AnimatePresence mode={"popLayout"}>
      {shouldRender &&
        words.map(
          (_, index) =>
            currentWordIndex === index && (
              <div key={index} className={"relative z-10"}>
                <motion.div
                  className={`absolute top-1/2 -translate-y-1/2 h-full origin-right !rounded-xl -z-10`}
                  initial={{
                    width: 0,
                    background: backgroundColors[currentColorIndex],
                  }}
                  animate={{
                    width: "calc(100% + 1rem)",
                  }}
                  exit={{ scaleX: 0 }}
                  transition={{
                    ...animationTypes.default,
                    delay: !isStarted ? delay : 0,
                    duration: animationProperties.durations.long,
                  }}
                />
                <div className={"relative overflow-hidden"}>
                  <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{
                      ...animationsTypes.default,
                      delay: !isStarted ? delay : 0,
                      duration: animationProperties.durations.long,
                    }}
                    className={`${className} ${opposite.foreground} ml-[1rem] mb-[.25rem] select-none`}
                  >
                    {words[index]}
                  </motion.div>
                </div>
              </div>
            ),
        )}
    </AnimatePresence>
  );
};

export default TextCarousel;
