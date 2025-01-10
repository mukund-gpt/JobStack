import React from "react";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import FilterCard from "./FilterCard";
import { useSelector } from "react-redux";

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
      <div className="w-[95vw] mx-auto flex gap-2 mt-4">
        <div className="w-1/5 rounded-md shadow-md">
          <FilterCard />
        </div>
        <div className="h-[80vh] w-4/5 flex flex-col">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {filteredJobs?.length == 0 ? (
              <div className="w-full h-full flex justify-center items-center text-2xl">
                No jobs found
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-2 p-2">
                {filteredJobs?.map((job) => (
                  <Job key={job?._id} job={job} />
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
