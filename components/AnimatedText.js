import React from "react";
import { motion } from "framer-motion";
import { animationsTypes } from "@/animations";

const AnimatedText = ({
  text,
  duration = 0.5,
  animationDelay = 0,
  letterDelay = 0.05,
  direction = "bottomToTop",
  className = "",
}) => {
  const words = text.split(" ");

  const delays = [];
  let delay = animationDelay;

  words.forEach((word, index) => {
    delays.push([]);
    word.split("").forEach((letter) => {
      delays[index].push((delay += letterDelay));
    });
  });

  return words.map((word, wordIndex) => (
    <React.Fragment key={wordIndex}>
      <div className={"h-fit w-fit overflow-hidden inline-flex py-[0.3rem]"}>
        {word.split("").map((letter, letterIndex) => (
          <motion.span
            key={letterIndex}
            initial={{
              y: direction === "bottomToTop" ? "100%" : "-100%",
            }}
            animate={{
              y: 0,
            }}
            transition={{
              ...animationsTypes.default,
              duration: duration,
              delay: delays[wordIndex][letterIndex],
            }}
            className={`inline-block ${className}`}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      {wordIndex <= words.length - 1 && (
        <span className="inline-block w-[1em] h-fit" aria-hidden="true">
          &nbsp;
        </span>
      )}
    </React.Fragment>
  ));
};

export default AnimatedText;
