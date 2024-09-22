import Image from "next/image";

const SuperNovaBlogs = () => {
  const packs = [
    {
      title: "Super title",
      description: "The Primordian threat has pushed civilization to the brink.",
      image: "/photos.png",
    },
    {
      title: "Super title",
      description: "The Primordian threat has pushed civilization to the brink.",
      image: "/photos3.png",
    },
    {
      title: "Super title",
      description: "The Primordian threat has pushed civilization to the brink.",
      image: "/photos2.png",
    },
  ];

  return (
    <section className="py-8 px-4 md:py-16 md:px-8 bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold uppercase mb-8 md:mb-12">Super Nova Blogs</h2>
      
      {/* Responsive Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {packs.map((pack, index) => (
          <div
            key={index}
            className="bg-teal-600 bg-opacity-70 rounded-xl p-5 w-full shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={pack.image}
              alt={pack.title}
              width={400} // specify width
              height={300} // specify height
              unoptimized={true}
              className="w-full h-48 md:h-64 object-cover rounded-t-lg mb-5"
            />
            <h3 className="text-lg md:text-xl font-semibold mb-3">{pack.title}</h3>
            <p className="text-sm md:text-base text-teal-100">{pack.description}</p>
          </div>
        ))}
      </div>

      {/* Navigation buttons (Optional) */}
      <div className="flex justify-center items-center mt-8">
        <button className="bg-teal-400 text-white p-3 rounded-full mx-2 hover:bg-teal-500">
          {"<"}
        </button>
        <button className="bg-teal-400 text-white p-3 rounded-full mx-2 hover:bg-teal-500">
          {">"}
        </button>
      </div>
    </section>
  );
};

export default SuperNovaBlogs;
