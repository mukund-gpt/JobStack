import React from "react";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import FilterCard from "./FilterCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchQuery } = useSelector((store) => store.job);

  const filteredJobs = allJobs.filter(
    (job) =>
      job?.location?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      job?.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      job?.description?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      job?.jobType?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full min-w-[350px] mx-auto flex gap-1 sm:gap-2 mt-4">
        <div className="w-2/6 sm:w-1/5 flex-shrink-0 rounded-md shadow-md">
          <FilterCard />
        </div>
        <div className="flex-grow h-[80vh] flex sm:w-4/5 flex-col">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {filteredJobs?.length == 0 ? (
              <div className="w-full h-full flex justify-center items-center text-2xl">
                No jobs found
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 sm:m-2 sm:p-2">
                {filteredJobs?.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 100, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
