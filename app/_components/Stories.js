"use client";
import { useState } from "react";
import { submitEmail } from "../_lib/apiService"; // Import the API service

const Stories = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To track form submission state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Call the API to submit the email
      const response = await submitEmail(email);

      if (response) {
        setSuccessMessage("Thank you for subscribing!");
        setEmail(""); // Clear the email field
      }
    } catch (error) {
      setErrorMessage("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false); // Stop loading state
    }
  };

  return (
    <section className="bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500 py-8 px-5 flex flex-col items-center text-white text-center">
      <span className="text-green-400 text-base lg:text-lg font-semibold mb-2">Newsletter</span>
      <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-5">Stories and Interviews</h2>
      <p className="text-sm lg:text-base max-w-lg mb-6 lg:mb-8 leading-relaxed">
        Subscribe to learn about new product features, the latest in technology, solutions, and updates.
      </p>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-md lg:max-w-lg mb-5"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 lg:p-4 text-base rounded-full shadow-lg w-full sm:w-72 focus:outline-none text-black"
          required
        />
        <button
          type="submit"
          className="bg-green-400 text-black font-bold py-3 px-6 lg:py-4 lg:px-8 rounded-full hover:bg-teal-400 transition-colors w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Subscribe"}
        </button>
      </form>

      {/* Success or Error Messages */}
      {successMessage && <p className="text-green-400">{successMessage}</p>}
      {errorMessage && <p className="text-red-400">{errorMessage}</p>}

      <p className="text-xs lg:text-sm text-white text-opacity-70 mt-3">
        We care about your data in our{" "}
        <a href="#" className="text-green-400 hover:underline">
          privacy policy
        </a>.
      </p>
    </section>
  );
};

export default Stories;
