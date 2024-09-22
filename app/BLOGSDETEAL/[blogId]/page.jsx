// app/BLOGSDETEAL/[blogId]/page.jsx

import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import Image from "next/image";

export default function BlogDetailPage({ params }) {
  const { blogId } = params;
  
  // Placeholder data for demonstration; in real scenario, fetch blog data based on blogId
  const blogData = {
    title: "Grid System for Better Design User Interface",
    date: "Sunday, 1 Jan 2023",
    featuredImage: "/path-to-featured-image.jpg",
    content: [
      {
        text: "A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points...",
        image: "/path-to-grid-structure-image.jpg",
      },
      {
        text: "Definition: A grid is made up of columns, gutters, and margins that provide a structure for the layout of elements on a page.",
        image: "/path-to-example-grid-image.jpg",
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500 text-white min-h-screen">
      <Header />

      {/* Blog Detail Section */}
      <div className="container mx-auto py-16 px-4 lg:px-8">
        {/* Blog Title */}
        <h2 className="text-4xl font-bold mb-4">{blogData.title}</h2>
        <p className="text-sm mb-8">{blogData.date}</p>

        {/* Featured Image */}
        <div className="mb-8">
          <Image
            src={blogData.featuredImage}
            alt="Grid System Design"
            width={1200} // Set appropriate width
            height={600} // Set appropriate height
            unoptimized={true}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          {blogData.content.map((section, index) => (
            <div key={index}>
              <p>{section.text}</p>
              <Image
                src={section.image}
                alt={`Blog section ${index + 1}`}
                width={1200} // Set appropriate width
                height={600} // Set appropriate height
                unoptimized={true}
                className="w-full my-6 rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  // Assuming you have a list of blog IDs that you want to generate statically
  const blogIds = ['1', '2', '3', '4']; // Example blog IDs

  return blogIds.map((blogId) => ({
    blogId,
  }));
}
