import CategoryCarousel from "@/components/CategoryCarousel";
import HeroSection from "@/components/HeroSection";
import LatestJobs from "@/components/LatestJobs";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import React from "react";

const Home = () => {
  useGetAllJobs();
  return (
    <div className="h-screen flex flex-col min-w-[350px] overflow-y-auto scrollbar-hide">
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
};

export default Home;
