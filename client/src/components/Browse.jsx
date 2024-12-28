import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import Footer from "./shared/Footer";

const Browse = () => {
  const random = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-[95vw] mx-auto flex gap-2 mt-4 justify-center">
        <div className="h-[80vh] flex flex-col">
          <div className="overflow-y-auto scrollbar-hide">
            <h1 className="text-xl font-semibold text-red-400 m-2 p-2">
              Search Results (4)
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-2 p-2">
              {random.length == 0 ? (
                <p>No jobs found</p>
              ) : (
                random.map((item, index) => (
                  <div key={index}>
                    <Job />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
