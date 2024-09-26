"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; 
import 'swiper/css';
import 'swiper/css/navigation';
import { getTikTokVideos } from "../_lib/apiService"; // Import the API service

const VideoSection = () => {
  const [videos, setVideos] = useState([]); // State to store TikTok videos
  const [loading, setLoading] = useState(true); // Loading state
  const [activeIndex, setActiveIndex] = useState(0); // State to track active slide

  // Fetch TikTok videos when the component mounts
  useEffect(() => {
    getTikTokVideos()
      .then((data) => {
        setVideos(data); // Set the fetched videos in state
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching TikTok videos:", error);
        setLoading(false); // Stop loading even in case of an error
      });
  }, []);

  const handleThumbnailClick = (videoLink) => {
    window.open(videoLink, "_blank"); // Open TikTok video in a new tab
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }

  return (
    <section className="py-16 bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500 text-white text-center relative">
      <h2 className="text-4xl font-bold uppercase mb-12">Super Nova Packs</h2>

      {/* Video Slider */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={5} // Reduce the space between slides
        slidesPerView={5} // Display 5 slides at a time
        centeredSlides={true}
        loop={true}
        slideToClickedSlide={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Track the active slide
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5, // Show 5 slides for larger screens
          },
        }}
        className="flex justify-center"
      >
        {videos.map((video, index) => {
          // Calculate the scale based on position relative to active slide
          let scale = 'scale-50'; // Default scale for all slides
          let width = '150px';
          let height = '250px';
          
          if (index === activeIndex) {
            scale = 'scale-100'; // Center slide
            width = '250px';
            height = '400px';
          } else if (
            index === (activeIndex + 1) % videos.length ||
            index === (activeIndex - 1 + videos.length) % videos.length
          ) {
            scale = 'scale-75'; // Slides immediately next to the center slide
            width = '200px';
            height = '300px';
          }

          return (
            <SwiperSlide 
              key={video.id} 
              className={`relative transition-transform duration-300 ${scale}`} // Adjust the scale for active and non-active slides
              style={{
                transformOrigin: 'center center', // Center the scaling effect
              }}
            >
              <div
                onClick={() => handleThumbnailClick(video.video_link)} // Open video in a new tab
                className="cursor-pointer p-2 rounded-lg"
                style={{
                  width: width, // Adjust width based on slide position
                  height: height, // Adjust height based on slide position
                }}
              >
                <Image
                  src={`${video.thumbnail_url}`} // Use video thumbnail
                  alt={`Thumbnail ${video.id}`}
                  width={250}  // Use larger width for the active thumbnail
                  height={400} // Use larger height for the active thumbnail
                  unoptimized={true}
                  className="object-cover rounded-md"
                />
                <div className="absolute inset-0 flex justify-center items-center">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 10.001v4.002a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                  </svg>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex gap-4">
        {/* Inverted and resized previous button */}
        <div className="swiper-button-next swiper-rtl bg-teal-500 rounded-full cursor-pointer"> 
          {/* <svg
            className="h-3 w-3 text-white" // Smaller icon size
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "rotate(180deg)" }} // Invert the arrow direction
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg> */}
        </div>
        
        {/* Inverted and resized next button */}
        <div className="swiper-button-prev swiper-rtl bg-teal-500 rounded-full cursor-pointer">
          {/* <svg
            className="h-3 w-3 text-white" // Smaller icon size
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "rotate(180deg)" }} // Invert the arrow direction
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg> */}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
