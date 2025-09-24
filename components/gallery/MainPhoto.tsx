"use client";
import React, { SetStateAction, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { animationProperties, animationsTypes } from "@/animations";
import { ProjectPhoto } from "@/views/Projects";
import { RootState } from "@/redux/store";

type OnPhotoChange<T> = (photo: T) => void;

type MainPhotoProps<T> = {
  photos: T[];
  currentPhoto: T;
  onPhotoChange: React.Dispatch<SetStateAction<T>> | OnPhotoChange<T>;
  className?: string;
  onPhotoHover?: (isHover: boolean) => any;
};

const MainPhoto = <T extends ProjectPhoto>({
  className = "",
  photos,
  currentPhoto,
  onPhotoChange,
  onPhotoHover,
}: MainPhotoProps<T>) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const containerRef = useRef(null);

  const [draggingDirection, setDraggingDirection] = useState(null);

  const currentPhotoIndex = photos.findIndex((p) => p.src === currentPhoto.src);

  const selectPhoto = (direction: -1 | 1) => {
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
      data-testid={"gallery-main-photo"}
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
            onDragEnd={() => {
              selectPhoto(draggingDirection === "left" ? -1 : 1);
              setDraggingDirection(null);
              onPhotoHover(true);
            }}
            onDrag={(e: MouseEvent) => {
              setDraggingDirection(e.movementX > 0 ? "left" : "right");
            }}
            onHoverStart={() => {
              if (onPhotoHover) {
                onPhotoHover(true);
              }
            }}
            onHoverEnd={() => {
              if (onPhotoHover) {
                onPhotoHover(false);
              }
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
              priority
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
    </motion.div>
  );
};

export default MainPhoto;
