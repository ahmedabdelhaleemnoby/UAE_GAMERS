"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getTikTokVideos } from "../_lib/apiService"; // Import the API service

const VideoSection = () => {
  const [videos, setVideos] = useState([]); // State to store TikTok videos
  const [loading, setLoading] = useState(true); // Loading state

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
    <section className="py-16 bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500 text-white text-center">
      <h2 className="text-4xl font-bold uppercase mb-12">Super Nova Packs</h2>

      {/* Video Thumbnails */}
      <div className="flex justify-center gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => handleThumbnailClick(video.video_link)} // Open video in a new tab
            className="relative cursor-pointer p-2 border-2 rounded-lg transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={`${video.thumbnail_url}`} // You can replace this with actual thumbnail images if available
              alt={`Thumbnail ${video.id}`}
              width={96}  // Set width for the thumbnails
              height={160} // Set height for the thumbnails
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
        ))}
      </div>
    </section>
  );
};

export default VideoSection;
