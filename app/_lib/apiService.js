// lib/apiService.js

const BASE_URL = "https://theway4business.27lashabab.com/api";
const BASE_URL2 = "https://backend.pcgamers.ae/api";

// Helper function to handle GET requests
export const getHeroSection = async (id = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/hero-section/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch hero section: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching hero section:", error);
    throw error;
  }
};

// Fetch settings data
export const getSettings = async () => {
  try {
    const response = await fetch(`${BASE_URL}/settings`);
    if (!response.ok) {
      throw new Error(`Failed to fetch settings: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
};
// Fetch Packages data
export const getPackages = async () => {
  try {
    const response = await fetch(`${BASE_URL}/packages`);
    if (!response.ok) {
      throw new Error(`Failed to fetch packages: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};
// Fetch SuperTitle

export const getSuperTitle = async () => {
  try {
    const response = await fetch(`${BASE_URL}/super-title`);
    if (!response.ok) {
      throw new Error(`Failed to fetch super title: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching super title:", error);
    throw error;
  }
};

// Fetch TikTok Videos
export const getTikTokVideos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tiktok-videos`);
    if (!response.ok) {
      throw new Error(`Failed to fetch TikTok videos: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching TikTok videos:", error);
    throw error;
  }
};

// Fetch Services Data
export const getServices = async () => {
  try {
    const response = await fetch(`${BASE_URL}/services`);
    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

// Fetch Services Main Images
export const getMainServiceImages = async () => {
  try {
    const response = await fetch(`${BASE_URL}/services/getmain/image`);
    if (!response.ok) {
      throw new Error(`Failed to fetch services main images: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data; // Return the data array
  } catch (error) {
    console.error("Error fetching services main images:", error);
    throw error;
  }
};

// Fetch Testimonials
export const getTestimonials = async () => {
  try {
    const response = await fetch(`${BASE_URL}/testimonials`);
    if (!response.ok) {
      throw new Error(`Failed to fetch testimonials: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data; // Return the testimonials data array
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
};
// Function to send email via the API
export const submitEmail = async (email) => {
  try {
    console.log(JSON.stringify({ email }));
    
    const response = await fetch(`${BASE_URL2}/followers/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), // Sending the key-value pair in JSON format
    });

    if (!response.ok) {
      throw new Error(`Failed to submit email: ${response.statusText}`);
    }

    const data = await response.json(); // Parse the response data
    return data;
  } catch (error) {
    console.error("Error submitting email:", error);
    throw error;
  }
};


// Function to fetch FAQs
export const getFAQs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/faqs`);
    if (!response.ok) {
      throw new Error(`Failed to fetch FAQs: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data; // Return the FAQs data array
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw error;
  }
};

// Function to fetch brand logos
export const getPartners = async () => {
  try {
    const response = await fetch(`${BASE_URL}/partners`);
    if (!response.ok) {
      throw new Error(`Failed to fetch partners: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data; // Return the array of partner logos
  } catch (error) {
    console.error("Error fetching partners:", error);
    throw error;
  }
};