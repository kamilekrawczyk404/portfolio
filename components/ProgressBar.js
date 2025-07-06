"use client";
import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";
import { useSelector } from "react-redux";
import { colors } from "@/layout"; // Ensure these paths are correct

const ProgressBar = ({ percentage, shouldAnimate }) => {
  const { opposite } = useSelector((state) => state.theme);

  const ref = useRef(null);
  const [barWidth, setBarWidth] = useState(0);

  const percentageMotionValue = useMotionValue(0);
  const width = useTransform(
    percentageMotionValue,
    [0, percentage],
    [0, percentage],
  );

  const [asPercentage, setAsPercentage] = useState(0);

  useEffect(() => {
    if (shouldAnimate) {
      const controls = animate(percentageMotionValue, percentage, {
        ...animationsTypes.default,
        duration: animationProperties.durations.long,
        delay: 0.1,
      });

      width.on("change", (v) => setAsPercentage(`${v}%`));

      return controls.stop;
    } else {
      percentageMotionValue.set(0);
    }
  }, [
    percentage,
    percentageMotionValue,
    animationsTypes,
    animationProperties,
    shouldAnimate,
  ]);

  useEffect(() => {
    if (ref.current) {
      setBarWidth(ref.current.getBoundingClientRect.width);
    }
  }, [ref.current]);

  return (
    <div className={"relative"}>
      <motion.div
        className={"absolute bottom-full w-fit -translate-x-1/2"}
        style={{ left: asPercentage }}
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: 1 } : {}}
        exit={{ opacity: 0 }}
        transition={{
          ...animationsTypes.default,
          delay: 0.1,
        }}
      >
        <div
          className={`mb-[.25rem] text-sm bg-blue-500 px-2 py-0 rounded-md border-1 ${colors.dark.border} ${colors.light.foreground} ${colors.light.background}`}
        >
          <span>{parseInt(asPercentage)}%</span>
        </div>
        <div
          className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0 border-[.25rem] border-b-0 border-l-transparent border-r-transparent`}
        ></div>
      </motion.div>

      <div className={"relative w-full h-[2rem] rounded-md overflow-hidden"}>
        <motion.div
          className={
            "absolute top-0 left-0 bg-purple h-full z-10 overflow-hidden"
          }
          style={{
            width: asPercentage,
            backgroundImage: `linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%, /* First stripe color (light transparent white) */
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
          )`,
            backgroundSize: "2rem 2rem",
          }}
          initial={{
            backgroundPosition: "0rem",
          }}
          animate={{
            backgroundPosition: "2rem",
          }}
          transition={{
            repeatType: "loop",
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>
        <div
          ref={ref}
          className={"absolute left-0 top-0 w-full h-full bg-gray-200 z-0"}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
