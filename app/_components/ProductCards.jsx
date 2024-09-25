"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getPackages } from "../_lib/apiService"; // Assuming you have a service to get packages

const ProductCards = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // Loading state
  const [currentIndices, setCurrentIndices] = useState({}); // To track the current image index for each product

  useEffect(() => {
    // Fetch the product data from the API using the centralized service
    getPackages()
      .then((data) => {
        const lastThreeProducts = data.data.slice(-3); // Get last 3 packages
        setProducts(lastThreeProducts);
        // Initialize current indices for each product to 0
        const initialIndices = {};
        lastThreeProducts.forEach((product, index) => {
          initialIndices[index] = 0;
        });
        setCurrentIndices(initialIndices);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false); // Stop loading even in case of an error
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator
  }

  const nextSlide = (index) => {
    setCurrentIndices((prevIndices) => ({
      ...prevIndices,
      [index]: (prevIndices[index] + 1) % products[index].image_urls.length,
    }));
  };

  const prevSlide = (index) => {
    setCurrentIndices((prevIndices) => ({
      ...prevIndices,
      [index]:
        prevIndices[index] === 0
          ? products[index].image_urls.length - 1
          : prevIndices[index] - 1,
    }));
  };

  return (
    <section className="py-12 px-6 lg:px-24 bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500">
      <h2 className="text-3xl lg:text-4xl text-white text-center mb-8 lg:mb-12">
        SUPER NOVA PACKS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-transparent border-2 border-teal-400 rounded-xl p-4 lg:p-6 flex flex-col justify-between shadow-lg hover:scale-105 transition-transform duration-300"
          
          >
            <div className="slider-container relative w-full mb-4"
            
            >
              <div className=" border-2 border-white w-2/3 h-2/3 left-1/4 top-1/3 absolute rotate-45 -z-1"></div>
              {/* Slider Image */}
              <Image
                src={products[index].image_urls[currentIndices[index]]}
                alt={products[index].title}
                width={400}
                height={200}
                unoptimized={true}
                className="w-full object-cover rounded-md custom-clip z-10"
                
              />
              {/* Slider controls */}
              <div
                className="absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer text-3xl bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={() => prevSlide(index)}
              >
                &#10094;
              </div>
              <div
                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-3xl bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={() => nextSlide(index)}
              >
                &#10095;
              </div>
            </div>

            <div className="text-center mb-4">
              <h3 className="text-lg lg:text-xl font-bold text-green-400 mb-2">
                {products[index].title}
              </h3>
              <p className="text-gray-300 text-sm lg:text-base mb-4">
                {products[index].short_description}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <button className="bg-green-400 text-black font-bold py-2 px-4 lg:px-6 rounded-l-2xl hover:bg-teal-400">
                Button
              </button>
              <div className="flex flex-col text-white text-sm lg:text-base">
                <small>Starting from</small>
                <p className="text-lg font-bold">{products[index].price} AED</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCards;
