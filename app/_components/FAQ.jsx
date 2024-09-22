"use client";
import { useEffect, useState } from "react";
import { getFAQs } from "../_lib/apiService"; // Import the API service

const FAQ = () => {
  const [faqs, setFaqs] = useState([]); // State to store FAQs
  const [activeIndex, setActiveIndex] = useState(null); // State to handle the active FAQ index
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch FAQs data from the API
  useEffect(() => {
    getFAQs()
      .then((data) => {
        setFaqs(data); // Set the fetched FAQs
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching FAQs:", error);
        setError("Failed to load FAQs. Please try again later.");
        setLoading(false); // Stop loading in case of error
      });
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    return <p className="text-white">Loading FAQs...</p>; // Show loading message while data is being fetched
  }

  if (error) {
    return <p className="text-red-400">{error}</p>; // Show error message if there's an error
  }

  return (
    <div className="bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500 py-12 flex flex-col justify-center items-center w-full">
      <h2 className="text-3xl text-white mb-8 uppercase shadow-md">FAQS</h2>
      {faqs.map((faq, index) => (
        <div
          key={faq.id} // Use faq.id as the key instead of index
          className="w-4/5 mb-4 border-2 border-green-400 rounded-lg overflow-hidden"
        >
          <div
            className="bg-transparent p-5 text-lg font-bold text-white flex justify-between items-center cursor-pointer hover:bg-opacity-20 hover:bg-teal-400 transition-all"
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
            <span className="text-green-400 text-xl font-bold">
              {activeIndex === index ? "-" : "+"}
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              activeIndex === index ? "max-h-40 p-5" : "max-h-0 p-0"
            } bg-teal-500 bg-opacity-20 text-white`}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
