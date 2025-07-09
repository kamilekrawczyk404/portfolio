"use client";
import React, { useState } from "react";
import MainPhoto from "@/components/gallery/MainPhoto";
import PhotosCarousel from "@/components/gallery/PhotosCarousel";

const Gallery = ({ photos, autoplay = true }) => {
  const [currentPhoto, setCurrentPhoto] = useState(photos[0]);

  return (
    <div className={"relative flex w-full h-full gap-4"}>
      <MainPhoto
        className={"basis-3/4 h-full"}
        currentPhoto={currentPhoto}
        photos={photos}
        onPhotoChange={setCurrentPhoto}
      />
      <PhotosCarousel
        className={"basis-1/4 h-full relative"}
        photos={photos}
        selected={currentPhoto}
        onPhotoChange={setCurrentPhoto}
      />
    </div>
  );
};

export default Gallery;
