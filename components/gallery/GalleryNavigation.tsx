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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";

type GalleryNavigationProps<T> = {
  photos: T[];
  selected: T;
  onIndicatorClick: Dispatch<SetStateAction<T>>;
  autoplay: boolean;
  autoplayDuration?: number;
  pauseOnHover?: boolean;
};

const GalleryNavigation = <T extends ProjectPhoto>({
  photos,
  selected,
  onIndicatorClick,
  autoplay,
  autoplayDuration = 4,
  pauseOnHover = false,
}: GalleryNavigationProps<T>): ReactNode => {
  const { opposite, theme } = useSelector((state: RootState) => state.theme);
  // For handling autoplay pause on hover

  // Motion values for progress bar animation
  const progress = useMotionValue(0);
  const width = useMotionTemplate`${progress}%`;

  const indicators = useRef<HTMLDivElement[] | null[]>([]);

  // Function to select previous or next photo
  const selectPhoto = (direction: -1 | 1) => {
    const selectedIndex = photos.findIndex((p) => p.src === selected.src);

    // If direction is -1, go to previous photo, else go to next photo
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

    progress.set(0);
  };

  // Function to go to the next image (used for autoplay)
  const nextImage = () => {
    const currentIndex = photos.findIndex((p) => p.src === selected.src);

    onIndicatorClick(
      photos[currentIndex === photos.length - 1 ? 0 : currentIndex + 1],
    );

    progress.set(0);
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

    progress.set(0);
  }, [selected, photos]);

  useEffect(() => {
    if (photos.length > 1 && autoplay) {
      const animateProgress = animate(progress, 100, {
        // User hovers the photo, recalculate the remaining duration
        duration: autoplayDuration - (progress.get() / 100) * autoplayDuration,
        onComplete: () => {
          nextImage();
        },
        ease: "linear",
      });

      if (pauseOnHover) {
        animateProgress.pause();
      } else {
        animateProgress.play();
      }

      return () => animateProgress.stop();
    }
  }, [selected, pauseOnHover]);

  return (
    <div
      data-testid={"gallery-navigation"}
      className={`relative flex w-full items-center justify-center ${layoutProperties.gap.small} h-32`}
    >
      <Button
        dataTestId={"previous-gallery-photo"}
        square
        navigation
        onClick={() => selectPhoto(-1)}
      >
        <Icons.AngleLeft />
      </Button>

      <div
        className={`relative h-full flex border-1 rounded-md lg:max-w-2/3 max-w-full overflow-x-scroll no-scrollbar ${theme.border} ${layoutProperties.gap.small} p-2`}
      >
        <AnimatePresence mode={"sync"}>
          {photos.map((photo, index) => (
            <div
              className={"relative h-full lg:min-w-[10rem] min-w-[6rem]"}
              key={index}
            >
              <motion.div
                data-testid={"gallery-navigation-image"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative rounded-sm pointer h-full w-full cursor-pointer transition-[outline] overflow-hidden select-none ${
                  photo.src === selected?.src
                    ? "outline-2 outline-purple"
                    : `outline-1 ${theme.outline}`
                }`}
                onClick={() => onIndicatorClick(photos[index])}
              >
                <Image
                  {...photo}
                  fill
                  sizes={"max-width: 100vw"}
                  style={{ objectFit: "contain" }}
                  loading={"lazy"}
                  quality={25}
                  className={"rounded-lg pointer-events-none"}
                />
                <div
                  className={`absolute rounded-br-sm left-0 top-0 text-md px-2 text-center z-10 ${
                    selected.src === photo.src
                      ? `bg-purple ${opposite.foreground}`
                      : `${opposite.foreground} ${opposite.background}`
                  }`}
                >
                  {index + 1}
                </div>
                <motion.div
                  ref={(el) => {
                    if (el) {
                      indicators.current[index] = el;
                    }
                  }}
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.975 }}
                  initial={false}
                  animate={{
                    minWidth: photo.src === selected.src ? "8rem" : "4rem",
                  }}
                  onClick={() => {
                    onIndicatorClick(photo);
                  }}
                  className={`absolute bottom-0 inset-x-0 h-2 overflow-hidden cursor-pointer ${opposite.background}`}
                >
                  <motion.div
                    className={`absolute inset-0 h-full bg-purple`}
                    style={{ width: selected.src === photo.src ? width : 0 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          ))}
        </AnimatePresence>
      </div>

      <Button
        dataTestId={"next-gallery-photo"}
        square
        navigation
        onClick={() => selectPhoto(1)}
      >
        <Icons.AngleRight />
      </Button>
    </div>
  );
};

export default GalleryNavigation;
