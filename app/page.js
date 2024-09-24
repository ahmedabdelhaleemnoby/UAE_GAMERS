import FAQ from './_components/FAQ';
import Footer from './_components/Footer';
import Header from './_components/Header';
import Hero from './_components/Hero';
import ImageCarousel from './_components/ImageCarousel';
import ImagePopup from './_components/ImagePopup';
import ProductCards from './_components/ProductCards';
import Stories from './_components/Stories';
import SuperNovaBlogs from './_components/SuperNovaBlogs';
import Testimonials from './_components/Testimonials';
import VideoSection from './_components/VideoSection';

export default function Home() {
  // useEffect(() => {
  //   // وظيفة للتحقق من تكرار الفئات
  //   const checkForDuplicateClasses = () => {
  //     const allElements = document.querySelectorAll('*');
  //     const classMap = new Map();

  //     allElements.forEach((element) => {
  //       element.classList.forEach((className) => {
  //         if (classMap.has(className)) {
  //           // إذا كان الكلاس مكرر، اطبع رسالة بالتحذير
  //           console.warn(`Duplicate class found: ${className}`, element);
  //           // إضافة خلفية حمراء توضح التكرار في الـDOM
  //           element.style.border = "2px solid red";
  //         } else {
  //           classMap.set(className, true);
  //         }
  //       });
  //     });
  //   };

  //   checkForDuplicateClasses();
  // }, []); // تشغيل الوظيفة عند تحميل الصفحة

  return (
    <div className="bg-gradient-to-r from-[#003A3A] to-[#00B2B1] min-h-screen">
      <Header />
      <Hero />
      <ProductCards />
      <ImagePopup />
      <VideoSection />
      <ImageCarousel />
      <SuperNovaBlogs />
      <Testimonials />
      <Stories />
      <FAQ />
      <Footer />
    </div>
  );
}
