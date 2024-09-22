"use client";
import Image from "next/image";
import { useState } from "react";

const ImageSection = () => {
  const images = [
    { id: 1, src: "/photo1.png", width: 1920, height: 1080 },
    { id: 2, src: "/photo2.png", width: 1920, height: 1080 },
    { id: 3, src: "/photo3.png", width: 1920, height: 1080 },
  ];

  const [activeImage, setActiveImage] = useState(images[0].src);

  const handleThumbnailClick = (imageSrc) => {
    setActiveImage(imageSrc);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500 text-white text-center">
      <h2 className="text-4xl font-bold uppercase mb-8">Super Nova Packs</h2>

      {/* Large Main Image */}
      <div className="relative bg-teal-600 rounded-xl mx-auto mb-8 w-full max-w-4xl">
        <Image 
          src={activeImage} 
          alt="Main Display" 
          width={1920} 
          height={1080} 
          unoptimized={true}
          className="w-full h-auto rounded-xl object-cover" 
        />
      </div>

      {/* Thumbnail Carousel */}
      <div className="flex justify-center gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => handleThumbnailClick(image.src)}
            className={`cursor-pointer p-2 border-2 rounded-lg transition-transform duration-300 ${
              activeImage === image.src ? "border-teal-400" : "border-transparent"
            } hover:scale-105`}
          >
            <Image
              src={image.src}
              alt={`Thumbnail ${image.id}`}
              width={192}
              height={108}
              unoptimized={true}
              className="w-24 h-16 object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageSection;
