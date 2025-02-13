import CategoryCarousel from "@/components/Home/CategoryCarousel";
import HeroSection from "@/components/Home/HeroSection";
import LatestJobs from "@/components/Home/LatestJobs";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import TopCompanies from "@/components/Home/TopCompanies";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import React from "react";

const Home = () => {
  useGetAllJobs();
  return (
    <div className="h-screen flex flex-col min-w-[350px] overflow-y-auto scrollbar-hide">
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <TopCompanies />
      <LatestJobs />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
};

export default Home;
