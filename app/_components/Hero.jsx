"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getHeroSection } from "../_lib/apiService";

const Hero = () => {
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the hero section data from the API
    getHeroSection(1)
      .then((data) => {
        setMedia(data.media_url);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hero section data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Helper function to check if media is a video or image
  const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg)$/i);
  };

  return (
    <section className="relative h-screen bg-cover bg-center bg-no-repeat bg-gradient-to-r from-teal-900 via-teal-600 to-teal-400 flex flex-col justify-center items-center text-white">
      {/* Conditionally render either an image or a video */}
      {isVideo(media) ? (
        <>
          <video className="w-full h-full object-cover absolute top-0 left-0" autoPlay loop muted>
            <source src={media} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-2xl">video</p>
        </>
      ) : (
        <Image
          src={media}
          alt="Hero"
          className="object-cover absolute top-0 left-0 w-full h-full"
          width={1920}
          height={1080}
          unoptimized={true}
        />
      )}
      
      <div className="relative z-10 text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Super Nova Packs
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Your Ultimate Tech Experience
        </p>
        <button className="bg-green-400 text-black font-bold py-3 px-6 rounded-full hover:bg-teal-400 transition-colors mt-4 text-sm md:text-lg">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
