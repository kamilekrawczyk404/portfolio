"use client";
import React from "react";
import { useMotionValue, useTransform, motion } from "framer-motion";
import { colors } from "@/layout";
import { Variants } from "motion-dom";

type Cord = {
  x: number;
  y: number;
};

type AnimatesCheckboxProps = {
  isChecked: boolean;
  className?: string;
};

const AnimatedCheckbox = ({
  className = "",
  isChecked,
}: AnimatesCheckboxProps) => {
  const tickVariants: Variants = {
    pressed: (value: boolean) => ({ pathLength: value ? 0.85 : 0.2 }),
    checked: {
      pathLength: 1,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    unchecked: {
      pathLength: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  const boxVariants: Variants = {
    hover: { scale: 1.05 },
    pressed: { scale: 0.95 },
  };

  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.1, 0.2], [0, 1]);

  const scaleFactor = 28 / 300; // Target size / Original size

  const originalCords: Cord[] = [
    { x: 0, y: 160.666 },
    { x: 120.658, y: 310.373 },
    { x: 300.808, y: 0 },
  ];
  const scaledCoords = originalCords.map((cord: Cord) => ({
    x: cord.x * scaleFactor,
    y: cord.y * scaleFactor,
  }));

  const newPathD = `M ${scaledCoords[0].x} ${scaledCoords[0].y} L ${scaledCoords[1].x} ${scaledCoords[1].y} L ${scaledCoords[2].x} ${scaledCoords[2].y}`;

  const newStrokeWidth = 3;

  return (
    <motion.div
      variants={boxVariants}
      whileHover="hover"
      whileTap="pressed"
      animate={isChecked ? "checked" : "unchecked"}
      className={`aspect-square cursor-pointer relative ${className}`}
    >
      <input
        type={"checkbox"}
        className={"hidden"}
        value={isChecked ? "checked" : "unchecked"}
      />
      <svg
        width={28} // 1.75rem = 28px (assuming 1rem = 16px)
        height={28} // 1.75rem = 28px
        viewBox="0 0 28 28" // Set viewBox to match new width/height for consistent scaling
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={newPathD} // Use the newly scaled path data
          fill="transparent"
          strokeWidth={newStrokeWidth} // Use the new, smaller stroke width
          stroke={colors.purple}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={tickVariants}
          style={{ pathLength, opacity, scale: 0.45 }}
          custom={isChecked} // Pass custom prop if needed for variants
        />
      </svg>
    </motion.div>
  );
};

export default AnimatedCheckbox;
