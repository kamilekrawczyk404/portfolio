"use client";
import React, { useCallback, useState } from "react";
import MainPhoto from "@/components/gallery/MainPhoto";
import { ProjectPhoto } from "@/views/Projects";
import GalleryNavigation from "@/components/gallery/GalleryNavigation";

type GalleryProps<T> = {
  photos: T[];
  autoplay?: boolean;
  pauseOnHover?: boolean;
};

const Gallery = <T extends ProjectPhoto>({
  photos,
  autoplay = true,
  pauseOnHover = false,
}: GalleryProps<T>) => {
  const [currentPhoto, setCurrentPhoto] = useState<T>(photos[0]);
  const [isHovering, setIsHovering] = useState(false);

  const photoHoverCallback = useCallback((isHover: boolean) => {
    if (!pauseOnHover) return;
    setIsHovering(isHover);
  }, []);

  return (
    <div
      data-testid={"gallery-container"}
      className={"relative flex flex-col w-full h-full gap-4"}
    >
      <MainPhoto
        className={"h-full"}
        currentPhoto={currentPhoto}
        photos={photos}
        onPhotoChange={setCurrentPhoto}
        onPhotoHover={photoHoverCallback}
      />
      <GalleryNavigation
        photos={photos}
        autoplay={autoplay}
        selected={currentPhoto}
        pauseOnHover={isHovering}
        onIndicatorClick={setCurrentPhoto}
      />
      <input
        type={"hidden"}
        data-testid={"gallery-current-photo-index"}
        value={photos.findIndex((p) => p.src === currentPhoto.src)}
      />
    </div>
  );
};

export default Gallery;
