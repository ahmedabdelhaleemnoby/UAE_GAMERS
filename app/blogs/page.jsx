import Image from "next/image"; // Import Next.js Image
import Footer from "../_components/Footer";
import Header from "../_components/Header";

const BlogPage = () => {
  const blogs = Array(12).fill({
    title: "Super title",
    description: "The Primordian threat has pushed civilization to the brink.",
    image: "/photos.png", // Replace with your image path
  });

  return (
    <div className="bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500 text-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-white">
        <h1 className="text-6xl font-bold mb-4">Blogs</h1>
      </section>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8 pb-16">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-teal-600 rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
          >
            <Image
              src={blog.image}
              alt={blog.title}
              width={400} // Example width for image
              height={300} // Example height for image
              unoptimized={true}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-300">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
