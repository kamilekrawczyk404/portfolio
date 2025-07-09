"use client";
import React, { useEffect, useRef } from "react"; // Import useRef
import Image from "next/image";
import { motion } from "framer-motion";

const PhotosCarousel = ({
  photos,
  onPhotoChange,
  selected,
  className = "",
}) => {
  const scrollContainerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (selected && itemRefs.current.length > 0) {
      const selectedIndex = photos.findIndex(
        (photo) => photo.src === selected.src,
      );

      if (selectedIndex !== -1 && itemRefs.current[selectedIndex]) {
        const selectedPhotoElement = itemRefs.current[selectedIndex];

        // Use scrollIntoView to bring the element into view
        selectedPhotoElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [selected, photos]);

  return (
    <div
      ref={scrollContainerRef}
      className={`grid grid-cols-2 gap-2 overflow-y-scroll p-2 ${className}`}
    >
      {photos.map((photo, index) => (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          key={index}
          ref={(el) => (itemRefs.current[index] = el)}
          className={`relative rounded-lg pointer aspect-square w-full cursor-pointer transition-[outline]  ${
            photo.src === selected?.src
              ? "outline-2 outline-purple"
              : "outline-1"
          }`}
          onClick={() => onPhotoChange(photos[index])}
        >
          <Image
            {...photo}
            fill
            style={{ objectFit: "contain" }}
            loading={"lazy"}
            quality={25}
            className={"rounded-lg pointer-events-none"}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default PhotosCarousel;
