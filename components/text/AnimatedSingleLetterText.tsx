"use client";
import React, { JSX, ReactNode } from "react";
import { motion } from "framer-motion";
import { animationsTypes, Direction } from "@/animations";

type AnimateSingleLetterTextProps = {
  text: string;
  duration?: number;
  animationDelay?: number;
  letterDelay?: number;
  direction?: Direction;
  className?: string;
  shouldRender?: boolean;
  whileInView?: boolean;
  onlyOnce?: boolean;
};
const AnimateSingleLetterText = ({
  text,
  duration = 0.5,
  animationDelay = 0,
  letterDelay = 0.05,
  direction = "fromBottom",
  className = "",
  shouldRender = true,
  whileInView = false,
  onlyOnce = true,
}: AnimateSingleLetterTextProps): ReactNode[] => {
  const words = text.split(" ");

  return (
    shouldRender &&
    words.map((word, wordIndex) => (
      <React.Fragment key={wordIndex}>
        <span className={"w-fit overflow-hidden inline-flex py-[0.3rem]"}>
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              viewport={onlyOnce ? { once: true } : {}}
              initial={{
                y: direction === "fromBottom" ? "100%" : "-100%",
              }}
              animate={
                !whileInView
                  ? {
                      y: 0,
                    }
                  : {}
              }
              whileInView={whileInView ? { y: 0 } : {}}
              transition={{
                ...animationsTypes.default,
                duration,
                delay:
                  animationDelay +
                  wordIndex * letterDelay +
                  letterIndex * letterDelay,
              }}
              className={`md:leading-[2.7rem] leading-[2rem] inline-block single-letter ${className}`}
            >
              {letter}
            </motion.span>
          ))}
        </span>
        {wordIndex <= words.length - 1 && (
          <span className="inline-block w-[1em] h-fit" aria-hidden="true">
            &nbsp;
          </span>
        )}
      </React.Fragment>
    ))
  );
};

export default AnimateSingleLetterText;
