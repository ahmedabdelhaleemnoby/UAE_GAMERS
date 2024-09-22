"use client"; // Ensure client-side rendering
import Image from "next/image"; // Import Next.js Image
import { useEffect, useState } from "react";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import { getPackages } from "../_lib/apiService"; // Import the API call

const PackagePage = () => {
  const [packages, setPackages] = useState([]); // State to store fetched packages
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch packages data when the component mounts
  useEffect(() => {
    getPackages()
      .then((data) => {
        setPackages(data.data); // Set the fetched packages in state
        setLoading(false); // Stop loading after fetching data
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
        setLoading(false); // Stop loading even in case of an error
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Display a loading message until data is fetched
  }

  return (
    <div className="bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500 text-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-white">
        <h1 className="text-6xl font-bold mb-4">Packages</h1>
      </section>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8 pb-16">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="bg-teal-600 rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
          >
            <Image
              src={pkg.main_image_url} // Use the main image URL from the API
              alt={pkg.title}
              width={400} // Example width for image
              height={300} // Example height for image
              unoptimized={true}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{pkg.title}</h2>
              <p className="text-gray-300">{pkg.short_description}</p>
              <p className="text-gray-300 font-bold">{pkg.price} AED</p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default PackagePage;
