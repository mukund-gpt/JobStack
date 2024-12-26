import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const Home = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
};

export default Home;
