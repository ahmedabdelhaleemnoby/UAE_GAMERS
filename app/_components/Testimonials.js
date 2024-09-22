"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getTestimonials } from "../_lib/apiService"; // Import the API service

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]); // State to store testimonials
  const [activeIndex, setActiveIndex] = useState(0); // State for active testimonial
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the testimonials data from the API
  useEffect(() => {
    getTestimonials()
      .then((data) => {
        setTestimonials(data); // Set the fetched testimonials
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
        setLoading(false); // Stop loading in case of error
      });
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading message while data is being fetched
  }

  return (
    <section className="bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500 py-12 text-white flex flex-col items-center text-center">
      <h2 className="text-3xl lg:text-4xl uppercase mb-8">Super Nova Packs</h2>

      {/* Responsive layout for testimonials */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-10 w-full px-4">
        {/* Left Testimonial */}
        <div className="bg-teal-700 bg-opacity-80 rounded-xl p-6 w-full lg:w-36 h-48 flex flex-col justify-center items-center shadow-lg hover:scale-105 transform transition duration-300">
          <Image
            src={testimonials[(activeIndex - 1 + testimonials.length) % testimonials.length].image_url}
            alt={testimonials[(activeIndex - 1 + testimonials.length) % testimonials.length].name}
            className="rounded-full mb-4"
            width={80}
            height={80}
            unoptimized={true}
          />
          <p className="text-base lg:text-lg font-bold">{testimonials[(activeIndex - 1 + testimonials.length) % testimonials.length].name}</p>
        </div>

        {/* Active Testimonial */}
        <div className="bg-teal-700 bg-opacity-80 rounded-xl p-4 w-full lg:w-80 h-96 flex flex-col justify-center items-center shadow-lg hover:scale-105 transform transition duration-300">
          <Image
            src={testimonials[activeIndex].image_url}
            alt={testimonials[activeIndex].name}
            className="rounded-full mb-4"
            width={100}
            height={100}
            unoptimized={true}
          />
          <p className="text-lg font-bold mb-4">{testimonials[activeIndex].name}</p>
          <p className="italic text-opacity-90 text-xs lg:text-base">{testimonials[activeIndex].description}</p>
        </div>

        {/* Right Testimonial */}
        <div className="bg-teal-700 bg-opacity-80 rounded-xl p-6 w-full lg:w-36 h-48 flex flex-col justify-center items-center shadow-lg hover:scale-105 transform transition duration-300">
          <Image
            src={testimonials[(activeIndex + 1) % testimonials.length].image_url}
            alt={testimonials[(activeIndex + 1) % testimonials.length].name}
            className="rounded-full mb-4"
            width={80}
            height={80}
            unoptimized={true}
          />
          <p className="text-base lg:text-lg font-bold">{testimonials[(activeIndex + 1) % testimonials.length].name}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={prevTestimonial}
          className="bg-teal-400 bg-opacity-80 text-white text-xl p-3 rounded-full hover:bg-teal-500 transition-colors"
        >
          {"<"}
        </button>
        <button
          onClick={nextTestimonial}
          className="bg-teal-400 bg-opacity-80 text-white text-xl p-3 rounded-full hover:bg-teal-500 transition-colors"
        >
          {">"}
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
