"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // For fetching the current URL path
import { useEffect, useState } from "react";
import { getSettings } from "../_lib/apiService"; // Import the getSettings API call

const Header = () => {
  const [settings, setSettings] = useState(null); // State to hold settings data
  const [logo, setLogo] = useState(null);
  const [mounted, setMounted] = useState(false); // Ensure client-side rendering
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu toggle
  const pathname = usePathname(); // Fetch the current URL path

  useEffect(() => {
    setMounted(true);
    // Fetch settings data from the API using the centralized service
    getSettings()
      .then((data) => {
        setSettings(data.data); // Set the settings data
        setLogo(data.data.logo_url);
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  }, []);

  if (!mounted || !settings) return null; // Render nothing until settings data is fetched

  return (
    <header className="flex justify-between items-center py-3 px-4 lg:py-5 lg:px-6 bg-gradient-to-r from-teal-500 to-green-900 border-b border-opacity-10 border-white">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <Image
          src={logo} // Use the logo from the settings API
          alt="Logo"
          width={50}
          height={50}
          unoptimized={true}
          className="h-10 w-10 lg:h-12 lg:w-12"
        />
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-white text-xs lg:text-sm cursor-pointer hover:text-teal-400">AED ▼</span>
          <span className="text-white text-xs lg:text-sm cursor-pointer hover:text-teal-400">EN ▼</span>
        </div>
      </div>

      {/* Hamburger Button */}
      <div className="lg:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* Navigation and Social Icons (Visible on larger screens) */}
      <div className={`lg:flex lg:items-center bg-gradient-to-r from-teal-400 to-blue-500 rounded-r-[2rem] px-4 py-2 lg:px-6 lg:py-3 shadow-lg ${isMenuOpen ? "block" : "hidden"} lg:block`}>
        {/* Nav Menu */}
        <nav className="flex items-center gap-8 lg:gap-10 mr-6">
          <Link
            href="/"
            className={`relative text-lg font-bold ${
              pathname === "/"
                ? "text-black bg-white px-5 py-2 rounded-l-lg shadow-lg"
                : "text-white"
            } hover:text-teal-300 transition-colors cursor-pointer`}
          >
            Home
          </Link>
          <Link
            href="/gallery"
            className={`text-lg ${
              pathname === "/gallery"
                ? "text-black bg-white px-5 py-2 rounded-l-lg shadow-lg"
                : "text-white"
            } hover:text-teal-300 transition-colors cursor-pointer`}
          >
            Gallery
          </Link>
          <Link
            href="/blogs"
            className={`text-lg ${
              pathname === "/blogs"
                ? "text-black bg-white px-5 py-2 rounded-l-lg shadow-lg"
                : "text-white"
            } hover:text-teal-300 transition-colors cursor-pointer`}
          >
            Blogs
          </Link>
          <Link
            href="/serves"
            className={`text-lg ${
              pathname === "/serves"
                ? "text-black bg-white px-5 py-2 rounded-l-lg shadow-lg"
                : "text-white"
            } hover:text-teal-300 transition-colors cursor-pointer`}
          >
            Serves
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-4">
          <Link href={settings.tiktok_link} target="_blank">
            <Image
              src="/icons/tiktok.png"
              alt="TikTok"
              width={24}
              height={24}
              unoptimized={true}
              className="h-6 w-6 lg:h-8 lg:w-8 cursor-pointer hover:scale-110 transition-transform"
            />
          </Link>
          <Link href={settings.facebook_link} target="_blank">
            <Image
              src="/icons/facebook.png"
              alt="Facebook"
              width={24}
              height={24}
              unoptimized={true}
              className="h-6 w-6 lg:h-8 lg:w-8 cursor-pointer hover:scale-110 transition-transform"
            />
          </Link>
          <Link href={settings.twitter_link} target="_blank">
            <Image
              src="/icons/twitter.png"
              alt="Twitter"
              width={24}
              height={24}
              unoptimized={true}
              className="h-6 w-6 lg:h-8 lg:w-8 cursor-pointer hover:scale-110 transition-transform"
            />
          </Link>
          <Link href={settings.instagram_link} target="_blank">
            <Image
              src="/icons/instagram.png"
              alt="Instagram"
              width={24}
              height={24}
              unoptimized={true}
              className="h-6 w-6 lg:h-8 lg:w-8 cursor-pointer hover:scale-110 transition-transform"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
