"use client";
import React, { useState } from "react";
import MainPhoto from "@/components/gallery/MainPhoto";
import PhotosCarousel from "@/components/gallery/PhotosCarousel";
import { ProjectPhoto } from "@/views/Projects";
import { layoutProperties } from "@/layout";
import PhotosPagination from "@/components/gallery/PhotosPagination";

type GalleryProps<T> = {
  photos: T[];
  autoplay?: boolean;
};

const Gallery = <T extends ProjectPhoto>({
  photos,
  autoplay = true,
}: GalleryProps<T>) => {
  const [currentPhoto, setCurrentPhoto] = useState<T>(photos[0]);

  return (
    <div className={"relative flex lg:flex-row flex-col w-full h-full gap-4"}>
      <div
        className={`basis-full flex flex-col justify-between ${layoutProperties.gap.medium}`}
      >
        <MainPhoto
          className={"basis-full"}
          currentPhoto={currentPhoto}
          photos={photos}
          onPhotoChange={setCurrentPhoto}
        />
        <PhotosPagination
          photos={photos}
          autoplay={autoplay}
          selected={currentPhoto}
          onIndicatorClick={setCurrentPhoto}
        />
      </div>
      <PhotosCarousel
        className={"basis-1/5 lg:h-full min-h-[6rem] relative"}
        photos={photos}
        selected={currentPhoto}
        onPhotoChange={setCurrentPhoto}
      />
    </div>
  );
};

export default Gallery;
