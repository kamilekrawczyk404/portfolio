"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/buttons/Button";
import { Icons } from "@/components/Icons";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { animationProperties, animationsTypes } from "@/animations";

const MainPhoto = ({ className = "", photos, currentPhoto, onPhotoChange }) => {
  const { theme } = useSelector((state) => state.theme);

  const containerRef = useRef(null);

  const [draggingDirection, setDraggingDirection] = useState(null);

  const currentPhotoIndex = photos.findIndex((p) => p.src === currentPhoto.src);

  const selectPhoto = (direction) => {
    if (direction < 0) {
      if (!currentPhotoIndex) {
        onPhotoChange(photos[photos.length - 1]);
      } else {
        onPhotoChange(photos[currentPhotoIndex - 1]);
      }
    } else {
      if (currentPhotoIndex === photos.length - 1) {
        onPhotoChange(photos[0]);
      } else {
        onPhotoChange(photos[currentPhotoIndex + 1]);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ...animationsTypes.default }}
      className={`relative flex flex-col gap-4 overflow-hidden ${className}`}
    >
      <AnimatePresence mode={"sync"}>
        <div
          ref={containerRef}
          className={`relative rounded-xl h-full w-full rounded-xl border-1 overflow-hidden ${theme.border}`}
        >
          <motion.div
            key={photos[currentPhotoIndex].src}
            className={`relative h-full w-full `}
            whileTap={{
              cursor: "grabbing",
            }}
            initial={{ cursor: "grab", opacity: 0 }}
            dragConstraints={containerRef}
            dragElastic={0.5}
            onDragEnd={(e) => {
              selectPhoto(draggingDirection === "left" ? -1 : 1);
              setDraggingDirection(null);
            }}
            onDrag={(e) => {
              setDraggingDirection(e.movementX > 0 ? "left" : "right");
            }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            drag={"x"}
            transition={{
              ...animationsTypes.default,
              duration: animationProperties.durations.long,
            }}
          >
            <Image
              fill
              sizes={"max-width: 100vw"}
              style={{ objectFit: "contain" }}
              src={photos[currentPhotoIndex].src}
              alt={photos[currentPhotoIndex].alt}
              quality={100}
              className={"pointer-events-none "}
            />
          </motion.div>
        </div>
      </AnimatePresence>
      <div className={"flex items-center justify-center gap-x-2"}>
        <Button square navigation onClick={() => selectPhoto(-1)}>
          <Icons.AngleLeft />
        </Button>
        <span
          className={`inline-block text-center w-[4rem] ${theme.foreground}`}
        >
          {currentPhotoIndex + 1} / {photos.length}
        </span>
        <Button square navigation onClick={() => selectPhoto(1)}>
          <Icons.AngleRight />
        </Button>
      </div>
    </motion.div>
  );
};

export default MainPhoto;
