"use client";
import React, { useEffect, useRef } from "react"; // Import useRef
import Image from "next/image";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { colors, layoutProperties } from "@/layout";
import StaggeredList from "@/components/lists/StaggeredList";

const PhotosCarousel = ({
  photos,
  onPhotoChange,
  selected,
  className = "",
}) => {
  const { theme } = useSelector((state) => state.theme);

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
          inline: "center",
        });
      }
    }
  }, [selected, photos]);

  return (
    <StaggeredList
      ref={scrollContainerRef}
      className={`relative h-full flex lg:flex-col flex-row gap-2 lg:overflow-y-scroll lg:overflow-x-visible overflow-y-unset overflow-x-scroll p-2 ${className}`}
      items={photos}
      render={(photo, index) => (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          ref={(el) => (itemRefs.current[index] = el)}
          className={`relative rounded-lg pointer lg:w-full lg:min-w-fit min-w-[33vw] lg:min-h-[6rem] h-full w-full cursor-pointer transition-[outline] overflow-hidden ${
            photo.src === selected?.src
              ? "outline-2 outline-purple"
              : `outline-1 ${theme.outline}`
          }`}
          onClick={() => onPhotoChange(photos[index])}
        >
          <Image
            {...photo}
            fill
            sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            style={{ objectFit: "contain" }}
            loading={"lazy"}
            quality={25}
            className={"rounded-lg pointer-events-none"}
          />
          <div
            className={`absolute rounded-br-md left-0 top-0 text-md bg-purple pl-1 pr-[.3rem] text-center z-10 ${colors.dark.foreground}`}
          >
            {index + 1}
          </div>
        </motion.div>
      )}
    />
  );
};

export default PhotosCarousel;
