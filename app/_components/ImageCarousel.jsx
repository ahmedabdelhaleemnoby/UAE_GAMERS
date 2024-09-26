"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMainServiceImages } from "../_lib/apiService"; // Import the API service

const ImageCarousel = () => {
  const [services, setServices] = useState([]); // Store fetched services
  const [activeImage, setActiveImage] = useState(""); // Store the main image
  const [loading, setLoading] = useState(true); // Loading state
  const [currentIndex, setCurrentIndex] = useState(0); // Current index for pagination

  // Fetch the services data from the API
  useEffect(() => {
    getMainServiceImages()
      .then((data) => {
        setServices(data); // Set the fetched services data
        setActiveImage(data[1]?.main_image_url || data[0]?.main_image_url); // Set the second image as the active image if it exists, otherwise the first one
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false); // Stop loading in case of error
      });
  }, []);

  // Update the active image when the currentIndex changes
  useEffect(() => {
    if (services.length > 0) {
      const middleIndex = currentIndex + 1; // Middle index of the three displayed thumbnails
      setActiveImage(services[middleIndex]?.main_image_url || services[0]?.main_image_url);
    }
  }, [currentIndex, services]);

  // Handle clicking the thumbnail to change the main image
  const handleThumbnailClick = (imageSrc) => {
    setActiveImage(imageSrc);
  };

  // Show the next image
  const nextSlide = () => {
    if (currentIndex < services.length - 3) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to the start
    }
  };

  // Show the previous image
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(services.length - 3); // Loop to the end
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while fetching data
  }

  return (
    <section className="py-16 bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500 text-white text-center">
      <h2 className="text-4xl font-bold uppercase mb-8">Super Nova Packs</h2>

      {/* Large Main Image */}
      <div className="relative bg-transparent rounded-xl mx-auto w-full max-w-4xl overflow-hidden">
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
      <div className="relative flex justify-center gap-4 items-center mt-4">
        {/* Thumbnails */}
        <div className="flex gap-4">
          {services.slice(currentIndex, currentIndex + 3).map((service) => (
            <div
              key={service.id}
              onClick={() => handleThumbnailClick(service.main_image_url)}
              className={`cursor-pointer -mt-6 border-2 rounded-lg transition-transform duration-300 ${
                activeImage === service.main_image_url ? "border-teal-400" : "border-transparent"
              } hover:scale-105`}
            >
              <Image
                src={service.main_image_url}
                alt={`Thumbnail ${service.id}`}
                width={192}
                height={108}
                unoptimized={true}
                className="w-24 h-16 object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        {/* Previous Arrow */}
        <button
          onClick={prevSlide}
          className="px-3 py-1 text-2xl bg-teal-500 text-white rounded-full hover:bg-teal-400 transition"
        >
          &lt;
        </button>

        {/* Next Arrow */}
        <button
          onClick={nextSlide}
          className="px-3 py-1 text-2xl bg-teal-500 text-white rounded-full hover:bg-teal-400 transition"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default ImageCarousel;
