"use client";
import React, { useState } from "react";
import MainPhoto from "@/components/gallery/MainPhoto";
import PhotosCarousel from "@/components/gallery/PhotosCarousel";

const Gallery = ({ photos, autoplay = true }) => {
  const [currentPhoto, setCurrentPhoto] = useState(photos[0]);

  return (
    <div className={"relative flex lg:flex-row flex-col w-full h-full gap-4"}>
      <MainPhoto
        className={"lg:basis-4/5 basis-full h-full"}
        currentPhoto={currentPhoto}
        photos={photos}
        onPhotoChange={setCurrentPhoto}
      />
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
