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
  }, []);

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
    <div className="flex justify-between p-12 bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500">
      {/* Single Image */}
      <div className="max-w-2/5 cursor-pointer" onClick={openModal}>
        <Image
          src={image.main_image_url} // Use the main image URL from API
          alt="Main Image"
          width={500} // Specify the width for optimization
          height={300} // Specify the height for optimization
          unoptimized={true}
          className="w-full h-auto rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      <div className="max-w-3/5 flex flex-col justify-center text-white">
        <h2 className="text-5xl mb-5">{superTitleData.title}</h2>
        <p className="text-lg mb-5 leading-relaxed">
          {superTitleData.description} {/* Use the description from API */}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">Starting from 2000 AED</p>
          <button className="bg-green-400 text-black font-bold py-3 px-6 rounded-full hover:bg-teal-400 transition-colors duration-300">
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
            width: '60%',
            height: '60%',
            backgroundColor: '#000',
            color: '#fff',
          },
        }}
      >
        <Swiper spaceBetween={50} slidesPerView={1}>
          {image.image_urls.map((image, index) => (
            <SwiperSlide key={index}>
              <Image 
                src={image} 
                alt={`Slide ${index + 1}`} 
                width={800} // Adjust width to match modal
                height={450} // Adjust height to match modal
                unoptimized={true}
                className="w-full h-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal>
    </div>
  );
};

export default ImagePopup;
