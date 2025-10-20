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
import { RootState } from "@/redux/store";
import TextWithCode from "@/components/text/TextWithCode"; // Ensure these paths are correct

type ProgressBarProps = {
  percentage: number;
  shouldAnimate?: boolean;
};
const ProgressBar = ({ percentage, shouldAnimate }: ProgressBarProps) => {
  const { theme, opposite, selected } = useSelector(
    (state: RootState) => state.theme,
  );

  const percentageMotionValue = useMotionValue(0);
  const width = useTransform(
    percentageMotionValue,
    [0, percentage],
    ["0%", `${percentage}%`],
  );
  const percentageVelocity = useVelocity(percentageMotionValue);
  const rotate = useTransform(percentageVelocity, [-100, 0, 100], [15, 0, -15]);

  const barsBackground = selected === "dark" ? "255,255,255" : "0,0,0";

  const left = useMotionValue<string>("0%");
  const [currentWidthValue, setCurrentWidthValue] = useState<number>(0);

  useEffect(() => {
    if (shouldAnimate) {
      const controls = animate(percentageMotionValue, percentage, {
        ...animationsTypes.default,
        duration: animationProperties.durations.long,
      });

      width.on("change", (v) => {
        setCurrentWidthValue(parseInt(v.substring(-1)));
        left.set(v);
      });

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
      <div className={"relative mx-1"}>
        <motion.div
          className={`absolute bottom-full w-fit -translate-x-1/2`}
          style={{ left, rotate }}
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : {}}
          exit={{ opacity: 0 }}
          transition={{
            ...animationsTypes.default,
          }}
        >
          <div className={`mb-[.25rem] text-sm h-5 flex items-center`}>
            <TextWithCode
              text={currentWidthValue.toString() + "%"}
              separator={""}
            />
          </div>
          <div
            className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0 border-[.25rem] border-b-0 border-l-transparent border-r-transparent ${theme.border}`}
          ></div>
        </motion.div>
      </div>

      <div
        className={`relative w-full h-5 rounded-md content-center overflow-hidden border-1  ${theme.borderSecondary}`}
      >
        <div className={"relative h-full"}>
          <motion.div
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 overflow-hidden shadow-sm h-full rounded-sm ${theme.backgroundLight}`}
            style={{
              width,
              backgroundImage: `linear-gradient(
            -45deg,
            rgba(${barsBackground}, 0.3) 25%, /* First stripe color (light transparent white) */
            transparent 25%,
            transparent 50%,
            rgba(${barsBackground}, 0.3) 50%,
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
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
