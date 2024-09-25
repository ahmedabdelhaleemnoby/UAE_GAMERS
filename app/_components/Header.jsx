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
    <header className="flex items-center justify-between py-3 px-4 lg:py-5 lg:px-6 bg-gradient-to-t from-[rgba(0,0,0,0)] to-[rgba(0,204,203,0.5)] border-b border-opacity-10 border-white">
      {/* Logo Section - 25% width */}
      <div className="flex items-center gap-4 w-[25%]">
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

      {/* Hamburger Button (Visible only on mobile) */}
      <div className="lg:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* Navigation and Social Icons (Visible on larger screens) - 40% width */}
      <div
        className={`lg:flex lg:items-center w-[60%] justify-rounded bg-teal-400 relative rounded-br-2xl px-4 py-2 lg:px-6 lg:py-3 shadow-lg ${
          isMenuOpen ? "block" : "hidden"
        } lg:block`}
        style={{
          background: "linear-gradient(to right, #00b2b1 44%, #00cccb 52%, #00b4df 80%, #009ff3 100%)",
          clipPath: "polygon(100% 0, 100% 49%, 100% 100%, 0 100%, 0 26%, 4% 0)",
        }}
      >
        {/* Add the triangle effect */}
        {/* <div className="absolute top-0 left-0 -rotate-90 w-0 h-0 border-t-[80px] border-t-[rgba(0,204,203,1)] border-l-[80px] border-l-transparent"></div> */}

        {/* Nav Menu */}
        <nav className="flex flex-col lg:flex-row items-center gap-4 lg:gap-10 mr-2 lg:mr-6">
          <Link
            href="/"
            className={`relative text-sm lg:text-lg font-bold ${
              pathname === "/"
                ? "text-black bg-white px-8 lg:px-5 py-2 rounded-br-2xl shadow-lg"
                : "text-white"
            } hover:text-teal-300 transition-colors cursor-pointer mx-8 sm:mx-0`}
            style={{
              clipPath: "polygon(50% 0%, 100% 0, 100% 60%, 96% 94%, 0 98%, 0% 60%, 2% 5%)",
              borderBottomRightRadius: "36%",
              borderTopLeftRadius: "39%",
            }}
          >
            Home
          </Link>
          <Link
            href="/gallery"
            className={`text-sm lg:text-lg ${
              pathname === "/gallery"
                ? "text-black bg-white px-8 lg:px-5 py-2 rounded-br-2xl shadow-lg"
                : "text-white"
            } hover:text-teal-300 transition-colors cursor-pointer mx-8 sm:mx-0`}
            style={{
              clipPath: "polygon(50% 0%, 100% 0, 100% 60%, 96% 94%, 0 98%, 0% 60%, 2% 5%)",
              borderBottomRightRadius: "36%",
              borderTopLeftRadius: "39%",
            }}
          >
            Gallery
          </Link>
          <Link
            href="/blogs"
            className={`text-sm lg:text-lg ${
              pathname === "/blogs"
                ? "text-black bg-white px-8 lg:px-5 py-2 rounded-br-2xl shadow-lg"
                : "text-white"
            } hover:text-teal-300 transition-colors cursor-pointer mx-8 sm:mx-0`}
            style={{
              clipPath: "polygon(50% 0%, 100% 0, 100% 60%, 96% 94%, 0 98%, 0% 60%, 2% 5%)",
              borderBottomRightRadius: "36%",
              borderTopLeftRadius: "39%",
            }}
          >
            Blogs
          </Link>
          <Link
            href="/serves"
            className={`text-sm lg:text-lg ${
              pathname === "/serves"
                ? "text-black bg-white px-8 lg:px-5 py-2 rounded-br-2xl shadow-lg"
                : "text-white"
            } hover:text-teal-300 transition-colors cursor-pointer mx-8 sm:mx-0`}
            style={{
              clipPath: "polygon(50% 0%, 100% 0, 100% 60%, 96% 94%, 0 98%, 0% 60%, 2% 5%)",
              borderBottomRightRadius: "36%",
              borderTopLeftRadius: "39%",
            }}
          >
            Serves
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-2 lg:gap-4 mt-4 lg:mt-0">
          <Link href={settings.tiktok_link} target="_blank">
            <Image
              src="/icons/tiktok.png"
              alt="TikTok"
              width={20}
              height={20}
              unoptimized={true}
              className="h-5 w-5 lg:h-6 lg:w-6 cursor-pointer hover:scale-110 transition-transform"
            />
          </Link>
          <Link href={settings.facebook_link} target="_blank">
            <Image
              src="/icons/facebook.png"
              alt="Facebook"
              width={20}
              height={20}
              unoptimized={true}
              className="h-5 w-5 lg:h-6 lg:w-6 cursor-pointer hover:scale-110 transition-transform"
            />
          </Link>
          <Link href={settings.twitter_link} target="_blank">
            <Image
              src="/icons/twitter.png"
              alt="Twitter"
              width={20}
              height={20}
              unoptimized={true}
              className="h-5 w-5 lg:h-6 lg:w-6 cursor-pointer hover:scale-110 transition-transform"
            />
          </Link>
          <Link href={settings.instagram_link} target="_blank">
            <Image
              src="/icons/instagram.png"
              alt="Instagram"
              width={20}
              height={20}
              unoptimized={true}
              className="h-5 w-5 lg:h-6 lg:w-6 cursor-pointer hover:scale-110 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* Empty Space to the Right */}
      <div className="hidden lg:block w-[20%]"></div>
    </header>
  );
};

export default Header;
