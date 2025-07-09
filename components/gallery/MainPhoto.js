"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/buttons/Button";
import { Icons } from "@/components/Icons";
import { motion } from "framer-motion";

const MainPhoto = ({ className = "", photos, currentPhoto, onPhotoChange }) => {
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
    <div
      className={`relative flex flex-col gap-4 overflow-hidden ${className}`}
    >
      <motion.div
        ref={containerRef}
        className={`relative rounded-xl h-full w-full flex`}
      >
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            className={"absolute top-0 h-full w-full"}
            animate={{
              left: `${(index - currentPhotoIndex) * 100}%`,
            }}
            whileTap={{
              cursor: "grabbing",
            }}
            initial={{ cursor: "grab" }}
            dragConstraints={containerRef}
            dragElastic={0.5}
            onDragEnd={(e) => {
              selectPhoto(draggingDirection === "left" ? -1 : 1);
              setDraggingDirection(null);
            }}
            onDrag={(e) => {
              setDraggingDirection(e.movementX > 0 ? "left" : "right");
            }}
            drag={"x"}
          >
            <Image
              fill
              style={{ objectFit: "cover" }}
              src={photo.src}
              alt={photo.alt}
              className={"pointer-events-none rounded-xl"}
            />
          </motion.div>
        ))}
      </motion.div>
      <div className={"flex items-center justify-center gap-x-2"}>
        <Button square navigation onClick={() => selectPhoto(-1)}>
          <Icons.AngleLeft />
        </Button>
        <span className={"inline-block text-center w-[4rem]"}>
          {currentPhotoIndex + 1} / {photos.length}
        </span>
        <Button square navigation onClick={() => selectPhoto(1)}>
          <Icons.AngleRight />
        </Button>
      </div>
    </div>
  );
};

export default MainPhoto;
