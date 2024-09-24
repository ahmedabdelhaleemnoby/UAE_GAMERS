"use client";
import Image from "next/image"; // Import Next.js Image
import Header from "../_components/Header";

const Serves = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 to-green-900 text-white">
      <Header />

      {/* Main Section */}
      <main className="flex flex-col-reverse md:flex-row justify-between items-center px-6 md:px-24 py-8 md:py-16">
        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-4 text-center md:text-left mt-8 md:mt-0">
          <h1 className="text-3xl md:text-5xl font-extrabold">Super Nova Packs</h1>
          <p className="text-base md:text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Facilisi senectus cursus proin in etiam. Senectus vestibulum ullamcorper nulla adipiscing. Feugiat odio amet pellentesque tincidunt lorem nibh fringilla ante.
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            Vel ac pretium varius tellus facilisis malesuada risus. Eget condimentum ridiculus tellus mauris cras faucibus turpis pulvinar.
          </p>
        </div>

        {/* Image Section */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <Image
            src="/Mask group.png"
            alt="Product"
            width={400} // Example width
            height={400} // Example height
            unoptimized={true}
            className="w-3/4 md:w-full mx-auto rounded-xl shadow-2xl"
          />
          <div className="absolute bottom-5 md:bottom-10 right-5 md:right-10 text-right">
            <p className="text-lg md:text-xl text-white font-semibold">Starting from</p>
            <p className="text-2xl md:text-4xl font-bold text-white">2000 AED</p>
          </div>
        </div>
      </main>

      {/* Social Icons at the Bottom */}
      <div className="flex justify-center gap-6 mt-8 md:mt-10">
        <Image
          src="/icons/tiktok.png"
          alt="TikTok"
          width={32}
          height={32}
          unoptimized={true}
          className="h-8 w-8 cursor-pointer hover:scale-110 transition-transform"
        />
        <Image
          src="/icons/facebook.png"
          alt="Facebook"
          width={32}
          height={32}
          unoptimized={true}
          className="h-8 w-8 cursor-pointer hover:scale-110 transition-transform"
        />
        <Image
          src="/icons/twitter.png"
          alt="Twitter"
          width={32}
          height={32}
          unoptimized={true}
          className="h-8 w-8 cursor-pointer hover:scale-110 transition-transform"
        />
        <Image
          src="/icons/instagram.png"
          alt="Instagram"
          width={32}
          height={32}
          unoptimized={true}
          className="h-8 w-8 cursor-pointer hover:scale-110 transition-transform"
        />
      </div>
    </div>
  );
};

export default Serves;
