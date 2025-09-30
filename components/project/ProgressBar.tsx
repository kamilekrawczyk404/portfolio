"use client";
import React, { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  useVelocity,
} from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";
import { useSelector } from "react-redux";
import { colors } from "@/layout";
import { RootState } from "@/redux/store"; // Ensure these paths are correct

type ProgressBarProps = {
  percentage: number;
  shouldAnimate?: boolean;
};
const ProgressBar = ({ percentage, shouldAnimate }: ProgressBarProps) => {
  const { theme, selected } = useSelector((state: RootState) => state.theme);

  const percentageMotionValue = useMotionValue(0);
  const width = useTransform(
    percentageMotionValue,
    [0, percentage],
    [0, percentage],
  );
  const percentageVelocity = useVelocity(percentageMotionValue);
  const rotate = useTransform(percentageVelocity, [-100, 0, 100], [15, 0, -15]);

  const barsBackground = selected === "dark" ? "255,255,255" : "0,0,0";

  const [asPercentage, setAsPercentage] = useState("");

  useEffect(() => {
    if (shouldAnimate) {
      const controls = animate(percentageMotionValue, percentage, {
        ...animationsTypes.default,
        duration: animationProperties.durations.long,
      });

      width.on("change", (v) => setAsPercentage(`${v.toFixed()}%`));

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

  return (
    <div className={"relative"}>
      <motion.div
        className={"absolute bottom-full w-fit -translate-x-1/2"}
        style={{ left: asPercentage, rotate }}
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: 1 } : {}}
        exit={{ opacity: 0 }}
        transition={{
          ...animationsTypes.default,
        }}
      >
        <div
          className={`mb-[.25rem] text-xs px-2 h-4 flex items-center rounded-full  border-1`}
        >
          <span>{asPercentage}</span>
        </div>
        <div
          className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0 border-[.25rem] border-b-0 border-l-transparent border-r-transparent`}
        ></div>
      </motion.div>

      <div className={"relative w-full h-4 rounded-lg overflow-hidden"}>
        <motion.div
          className={`absolute top-0 left-0 ${theme.backgroundSecondary} h-full z-10 overflow-hidden`}
          style={{
            width: asPercentage,
            backgroundImage: `linear-gradient(
            45deg,
            rgba(${barsBackground}, 0.3) 25%, /* First stripe color (light transparent white) */
            transparent 25%,
            transparent 50%,
            rgba(${barsBackground}, 0.3), 50%,
            rgba(${barsBackground}, 0.3) 75%,
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
          className={`absolute left-0 top-0 w-full h-full z-0 ${theme.backgroundSecondary}`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
