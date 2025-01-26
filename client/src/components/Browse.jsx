import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import Footer from "./shared/Footer";
import UseGetSearchJobs from "@/hooks/UseGetSearchJobs";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Browse = () => {
  const { searchJobs } = useSelector((store) => store.job);
  const { loading } = UseGetSearchJobs();

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="loading loading-bars text-4xl">
          loading loading-bars
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Navbar />
      <div className="w-[95vw] mx-auto flex gap-2 mt-4 justify-center">
        <div className="h-[80vh] flex flex-col">
          <h1 className="text-xl font-semibold text-red-400 m-2 p-2">
            Search Results ({searchJobs?.length})
          </h1>

          {searchJobs?.length == 0 ? (
            <div className="flex justify-center text-center text-[40px] m-auto">
              No jobs found
            </div>
          ) : (
            <div className="overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-2 p-2">
                {searchJobs?.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 100, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
