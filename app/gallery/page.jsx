import Image from "next/image"; // Import Next.js Image
import Footer from "../_components/Footer";
import Header from "../_components/Header";

const GalleryPage = () => {
  const images = Array(15).fill("/Component.png"); // Replace with actual image paths

  return (
    <div className="bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500 text-white min-h-screen">
      <Header />

      {/* Featured Image Section */}
      <section className="container mx-auto py-8 px-4 lg:px-8">
        <div className="flex justify-center gap-4">
          <Image
            src="/Component.png" // Replace with your image path
            alt="Featured 1"
            width={500} // Set appropriate width
            height={300} // Set appropriate height
            unoptimized={true}
            className="rounded-lg shadow-md"
          />
          <div className="flex flex-col gap-4">
            <Image
              src="/Component.png" // Replace with your image path
              alt="Featured 2"
              width={240} // Set appropriate width
              height={160} // Set appropriate height
              unoptimized={true}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/Component.png" // Replace with your image path
              alt="Featured 3"
              width={240} // Set appropriate width
              height={160} // Set appropriate height
              unoptimized={true}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="container mx-auto py-16 px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image}
                alt={`Gallery Image ${index + 1}`}
                width={300} // Set appropriate width
                height={200} // Set appropriate height
                unoptimized={true}
                className="w-full rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GalleryPage;
