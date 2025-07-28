"use client";
import React from "react";
import Button from "@/components/buttons/Button";
import { Icons } from "@/components/Icons";
import { motion } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";

const SubmitButton = ({ isLoading }) => {
  return (
    <Button
      main
      className={"w-fit inline-flex items-center gap-x-2 group"}
      layout
      disabled={isLoading}
    >
      {isLoading ? (
        <span className={"inline-flex relative gap-1 items-center"}>
          {Array.from(new Array(5), (i) => i).map((_, i) => (
            <motion.span
              key={i}
              className={"w-2 aspect-square bg-purple rounded-full"}
              initial={{ y: "-2.5px", scale: 1.25, opacity: 1 }}
              animate={{
                y: "4px",
                scale: 0.75,
                opacity: 0.75,
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: animationProperties.durations.medium,
                delay: i * 0.1,
              }}
            />
          ))}
        </span>
      ) : (
        <>
          Submit
          <span className={"group-hover:translate-x-[.25rem] transition-all"}>
            <Icons.Arrow />
          </span>
        </>
      )}
    </Button>
  );
};
export default SubmitButton;
