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
  onAnimationComplete?: (animationCompleteTime: number) => void;
};
const AnimateSingleLetterText = ({
  text,
  onAnimationComplete,
  duration = 0.5,
  animationDelay = 0,
  letterDelay = 0.05,
  direction = "fromBottom",
  className = "",
  shouldRender = true,
  whileInView = false,
  onlyOnce = true,
}: AnimateSingleLetterTextProps): ReactNode => {
  const words = text.split(" ");
  const letters = words
    .map((word, index) =>
      index !== words.length - 1 ? [...word.split(""), " "] : word.split(""),
    )
    .flat();

  return (
    <div>
      {shouldRender &&
        letters.map((letter, index) => (
          <motion.span
            key={index}
            viewport={onlyOnce ? { once: true } : {}}
            initial={{
              y: direction === "fromBottom" ? "25%" : "-25%",
              opacity: 0,
            }}
            animate={
              !whileInView
                ? {
                    y: 0,
                    opacity: 1,
                  }
                : {}
            }
            whileInView={whileInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              ...animationsTypes.default,
              duration,
              delay: animationDelay + index * letterDelay,
              opacity: {
                delay: animationDelay + index * letterDelay + letterDelay / 8,
              },
            }}
            className={`inline-block single-letter ${className}`}
            onAnimationComplete={() => {
              if (index === letters.length - 1 && onAnimationComplete) {
                onAnimationComplete(
                  animationDelay + letterDelay * letters.length,
                );
              }
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
    </div>
  );
};

export default AnimateSingleLetterText;
