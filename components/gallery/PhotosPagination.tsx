import {
  animate,
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { ProjectPhoto } from "@/views/Projects";
import { layoutProperties } from "@/layout";
import Button from "@/components/buttons/Button";
import { Icons } from "@/components/Icons";

type PhotosPaginationProps<T> = {
  photos: T[];
  selected: T;
  onIndicatorClick: Dispatch<SetStateAction<T>>;
  autoplay: boolean;
  autoplayDuration?: number;
};

const PhotosPagination = <T extends ProjectPhoto>({
  photos,
  selected,
  onIndicatorClick,
  autoplay,
  autoplayDuration = 4,
}: PhotosPaginationProps<T>): ReactNode => {
  const progress = useMotionValue(0);
  const width = useMotionTemplate`${progress}%`;

  const indicators = useRef<HTMLDivElement[] | null[]>([]);

  const selectPhoto = (direction: -1 | 1) => {
    const selectedIndex = photos.findIndex((p) => p.src === selected.src);

    if (direction < 0) {
      onIndicatorClick(
        !selectedIndex ? photos[photos.length - 1] : photos[selectedIndex - 1],
      );
    } else {
      onIndicatorClick(
        selectedIndex === photos.length - 1
          ? photos[0]
          : photos[selectedIndex + 1],
      );
    }
  };

  const nextImage = () => {
    const currentIndex = photos.findIndex((p) => p.src === selected.src);

    onIndicatorClick(
      photos[currentIndex === photos.length - 1 ? 0 : currentIndex + 1],
    );
  };

  useEffect(() => {
    if (selected && indicators.current.length > 0) {
      const selectedIndex = photos.findIndex(
        (photo) => photo.src === selected.src,
      );

      if (selectedIndex !== -1 && indicators.current[selectedIndex]) {
        const selectedIndicator = indicators.current[selectedIndex];

        // Use scrollIntoView to bring the element into view
        selectedIndicator.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  }, [selected, photos]);

  useEffect(() => {
    progress.set(0);

    if (photos.length > 1 && autoplay) {
      const animateProgress = animate(progress, 100, {
        duration: autoplayDuration,
        onComplete: () => {
          nextImage();
        },
        ease: "linear",
      });

      animateProgress.play();

      return animateProgress.stop;
    }
  }, [selected]);

  return (
    photos.length > 1 && (
      <div
        className={`flex ${layoutProperties.gap.small} w-full items-center justify-center`}
      >
        <Button square navigation onClick={() => selectPhoto(-1)}>
          <Icons.AngleLeft />
        </Button>

        <div
          className={`relative w-fit flex lg:max-w-1/2 max-w-full overflow-x-scroll no-scrollbar ${layoutProperties.gap.small}`}
        >
          <AnimatePresence mode={"sync"}>
            {photos.map((p, index) => (
              <motion.div
                ref={(el) => {
                  if (el) {
                    indicators.current[index] = el;
                  }
                }}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.975 }}
                initial={false}
                animate={{ minWidth: p.src === selected.src ? "8rem" : "4rem" }}
                key={index}
                onClick={() => onIndicatorClick(p)}
                className={
                  "relative h-2 overflow-hidden rounded-md cursor-pointer bg-gray-200"
                }
              >
                <motion.div
                  className={`absolute inset-0 h-full bg-purple`}
                  style={{ width: selected.src === p.src ? width : 0 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Button square navigation onClick={() => selectPhoto(1)}>
          <Icons.AngleRight />
        </Button>
      </div>
    )
  );
};

export default PhotosPagination;
