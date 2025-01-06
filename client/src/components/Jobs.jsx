import React from "react";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import FilterCard from "./FilterCard";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-[95vw] mx-auto flex gap-2 mt-4">
        <div className="w-1/5 rounded-md shadow-md">
          <FilterCard />
        </div>
        <div className="h-[80vh] w-4/5 flex flex-col">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-2 p-2">
              {allJobs.length == 0 ? (
                <p>No jobs found</p>
              ) : (
                allJobs.map((job) => <Job key={job?._id} job={job} />)
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
