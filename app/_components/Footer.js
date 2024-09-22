"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPartners, getSettings } from "../_lib/apiService"; // Import the API service

const Footer = () => {
  const [partners, setPartners] = useState([]); // State for brand logos
  const [footerSettings, setFooterSettings] = useState(null); // State for footer settings
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch brand logos and footer settings when the component mounts
  useEffect(() => {
    Promise.all([getPartners(), getSettings()])
      .then(([partnersData, settingsData]) => {
        setPartners(partnersData); // Set the fetched partners
        setFooterSettings(settingsData.data); // Set the footer settings
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching footer data:", error);
        setError("Failed to load footer data.");
        setLoading(false); // Stop loading on error
      });
  }, []);

  if (loading) {
    return <p>Loading footer...</p>; // Show loading message
  }

  if (error) {
    return <p className="text-red-400">{error}</p>; // Show error message
  }

  return (
    <footer className="bg-gradient-to-r from-teal-900 to-teal-500 py-5 flex flex-col items-center w-full text-white box-border">
      {/* Brand Logos Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-5 px-4">
        {partners.map((partner) => (
          <Image
            key={partner.id}
            src={partner.image_url}
            alt={partner.name}
            width={40}
            height={40}
            unoptimized={true}
            className="object-contain"
          />
        ))}
      </div>

      {/* Links Section */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6 px-8 py-5 border-t border-white border-opacity-10">
        {/* Logo */}
        <div>
          <Image
            src={footerSettings.logo_url} // Dynamically load logo
            alt="Footer Logo"
            width={80}
            height={40}
            unoptimized={true}
            className="mx-auto lg:mx-0"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col lg:flex-row gap-8 text-center lg:text-left">
          <div className="flex flex-row gap-2">
            <a href="#" className="hover:text-green-400 cursor-pointer">Serves</a>
            <a href="#" className="hover:text-green-400 cursor-pointer">Gallery</a>
            <a href="#" className="hover:text-green-400 cursor-pointer">About us</a>
            <a href="#" className="hover:text-green-400 cursor-pointer">Privacy</a>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <span className="text-xl font-bold">Join Us</span>
          <div className="flex gap-3 lg:gap-5">
            <a href={footerSettings.tiktok_link} target="_blank" rel="noreferrer">
              <Image
                src="/icons/tiktok.png"
                alt="TikTok"
                width={24}
                height={24}
                unoptimized={true}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
            </a>
            <a href={footerSettings.facebook_link} target="_blank" rel="noreferrer">
              <Image
                src="/icons/facebook.png"
                alt="Facebook"
                width={24}
                height={24}
                unoptimized={true}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
            </a>
            <a href={footerSettings.twitter_link} target="_blank" rel="noreferrer">
              <Image
                src="/icons/twitter.png"
                alt="Twitter"
                width={24}
                height={24}
                unoptimized={true}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
            </a>
            <a href={footerSettings.instagram_link} target="_blank" rel="noreferrer">
              <Image
                src="/icons/instagram.png"
                alt="Instagram"
                width={24}
                height={24}
                unoptimized={true}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
