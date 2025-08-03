"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { animationsTypes } from "@/animations";

const AnimateSingleLetterText = ({
  text,
  duration = 0.5,
  animationDelay = 0,
  letterDelay = 0.05,
  direction = "bottomToTop",
  className = "",
  shouldRender = true,
  whileInView = false,
}) => {
  const words = text.split(" ");

  return (
    shouldRender &&
    words.map((word, wordIndex) => (
      <React.Fragment key={wordIndex}>
        <div className={"h-fit w-fit overflow-hidden inline-flex py-[0.3rem]"}>
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              initial={{
                y: direction === "bottomToTop" ? "100%" : "-100%",
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
    ))
  );
};

export default AnimateSingleLetterText;
