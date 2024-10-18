"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getSuperTitle } from '../_lib/apiService'; // Import the API service

const ImagePopup = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [superTitleData, setSuperTitleData] = useState(null); // State to hold the fetched super title data
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [windowHeight, setWindowHeight] = useState(0); // State to store window height

  // Fetch the super title data when the component mounts
  useEffect(() => {
    getSuperTitle()
      .then((data) => {
        setSuperTitleData(data.data); // Set the super title data
        setImage(data);
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching super title:", error);
        setLoading(false); // Stop loading even in case of an error
      });
    
    // Update window height
    updateWindowHeight();

    // Add event listener to update height on window resize
    window.addEventListener('resize', updateWindowHeight);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', updateWindowHeight);
  }, []);

  // Function to update window height
  const updateWindowHeight = () => {
    setWindowHeight(window.innerHeight);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading indicator while data is being fetched
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between p-4 lg:p-12 bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500">
      {/* Single Image */}
      <div className="lg:max-w-[40%] mt-4 flex justify-center cursor-pointer" onClick={openModal}>
        <Image
          src={image.main_image_url} // Use the main image URL from API
          alt="Main Image"
          width={500} // Specify the width for optimization
          height={700} // Specify the height for optimization to make it taller
          unoptimized={true}
          className="h-auto rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      <div className="lg:max-w-[55%] flex flex-col justify-center text-white mt-6 lg:mt-0">
        {/* Title Section */}
        <h2 className="text-4xl lg:text-8xl text-center font-bold mb-5 relative">
          <span className={`relative ${modalIsOpen ? '' : 'z-10'}`} >{superTitleData.title || "Super Title"}</span>
          <span className="absolute top-6 lg:top-12 left-10 lg:left-28 w-2/3 h-12 opacity-60" style={{
                  backgroundImage: "url('/Rectangle 6957.png')",
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                }}></span>
        </h2>
        {/* Description */}
        <p className="text-base lg:text-lg mb-3 lg:mb-5 leading-relaxed pt-4 lg:pt-6">
          {superTitleData.description} {/* Use the description from API */}
        </p>
        <p className="text-sm lg:text-lg mb-3 lg:mb-5 leading-relaxed">
          {/* Adding more text for design consistency */}
          Office ipsum you must be muted. Uat market submit market box. Performance shoulder your squad shoot reinvent unpack crank die moving. Principles
        </p>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className='flex flex-col mb-4 lg:mb-0'>
            <p className="text-lg lg:text-2xl font-bold">Starting from</p>
            <p className="text-lg lg:text-2xl font-bold">2000 AED</p>
          </div>
          <button className="text-white font-bold bg-[#00B2B1] rounded-br-2xl py-2 px-4 lg:px-6 hover:bg-teal-400"
              style={{
                clipPath: "polygon(100% 0, 100% 49%, 100% 100%, 0 100%, 0 26%, 4% 0)",
              }}
          >
            Button
          </button>
        </div>
      </div>

      {/* Modal with Swiper */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%', // Adjust width for mobile devices
            maxWidth: '600px', // Limit width for larger screens
            height: '90vh', // Adjust height for mobile devices
            backgroundColor: 'transparent', // Set the background color to transparent
            color: '#fff',
          },
        }}
      >
        <Swiper spaceBetween={0} slidesPerView={1} loop={true} style={{ height: '100%' }}>
          {image.image_urls.map((image, index) => (
            <SwiperSlide key={index}>
              <Image 
                src={image} 
                alt={`Slide ${index + 1}`} 
                objectFit="cover" // Cover the container
                width={500}
                height={700}
                unoptimized={true}
                style={{ height: `${windowHeight}px`, width: '100%' }} // Set the height of the image to the window's height
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal>
    </div>
  );
};

export default ImagePopup;
