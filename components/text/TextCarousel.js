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

const TextCarousel = ({ words, delay = 0, duration = 3, className = "" }) => {
  const { opposite } = useSelector((state) => state.theme);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const backgroundColors = [colors.purple, colors.orange];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsStarted(true);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1 === words.length ? 0 : prev + 1));
      setCurrentColorIndex((prev) =>
        prev + 1 === backgroundColors.length ? 0 : prev + 1,
      );
    }, duration * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode={"popLayout"}>
      {words.map(
        (word, index) =>
          currentWordIndex === index && (
            <div key={index} className={"relative overflow-hidden z-10"}>
              <motion.div
                className={`absolute top-1/2 -translate-y-1/2 h-full origin-right !rounded-xl -z-10`}
                initial={{
                  width: 0,
                  background: backgroundColors[currentColorIndex],
                }}
                animate={{
                  width: "100%",
                }}
                exit={{ scaleX: 0 }}
                transition={{
                  ...animationTypes.default,
                  delay: !isStarted ? delay : 0,
                  duration: animationProperties.durations.long,
                }}
              />
              <motion.span
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{
                  ...animationsTypes.default,
                  delay: !isStarted ? delay : 0,
                  duration: animationProperties.durations.long,
                }}
                className={`${className} inline-block py-2 px-4 ${opposite.foreground}`}
              >
                {words[index]}
              </motion.span>
            </div>
          ),
      )}
    </AnimatePresence>
  );
};

export default TextCarousel;
