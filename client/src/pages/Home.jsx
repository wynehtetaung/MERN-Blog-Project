import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <div className="w-full h-auto flex item-start justify-between lg:gap-x-32 md:gap-x-16 sm:gap-x-8 gap-x-4 relative">
        {/* sidebar section */}
        <div className="lg:w-[16%] md:w-[17%] sm:w-none w-none h-[100vh] pt-10 px-3 border-r border-r-gray-500 sticky top-0 left-0 lg:block md:block sm:hidden hidden">
          <Navbar />
        </div>
        {/* mobile navbar section */}
        <div className="w-full h-auto py-1 px-3 border-t border-t-[#1d1d1d] fixed bottom-0 left-0 lg:hidden md:hidden sm:block block bg-black z-50">
          <MobileNav />
        </div>
      </div>
    </>
  );
}
