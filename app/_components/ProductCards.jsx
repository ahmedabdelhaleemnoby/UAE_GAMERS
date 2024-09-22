"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPackages } from "../_lib/apiService"; // Import the getPackages API call

const ProductCards = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch the product data from the API using the centralized service
    getPackages()
      .then((data) => {
        // Get the last 3 packages
        const lastThreeProducts = data.data.slice(-3);
        setProducts(lastThreeProducts); // Set the products in state
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

  return (
    <section className="py-12 px-6 lg:px-24 bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500">
      <h2 className="text-3xl lg:text-4xl text-white text-center mb-8 lg:mb-12">
        SUPER NOVA PACKS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-transparent border-2 border-teal-400 rounded-xl p-4 lg:p-6 flex flex-col justify-between shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="flex justify-center mb-4">
              <Image
                src={product.main_image_url} // Use main image URL from API
                alt={product.title}
                width={400} // Set appropriate width
                height={200} // Set appropriate height
                unoptimized={true}
                className="w-full object-cover rounded-md"
              />
            </div>
            <div className="text-center mb-4">
              <h3 className="text-lg lg:text-xl font-bold text-green-400 mb-2">
                {product.title}
              </h3>
              <p className="text-gray-300 text-sm lg:text-base mb-4">
                {product.short_description}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <button className="bg-green-400 text-black font-bold py-2 px-4 lg:px-6 rounded-l-2xl hover:bg-teal-400">
                Button
              </button>
              <div className="flex flex-col text-white text-sm lg:text-base">
                <small>Starting from</small>
                <p className="text-lg font-bold">{product.price} AED</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCards;
