import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="w-full my-5">
      {allJobs?.length === 0 ? (
        <div className="text-center text-lg m-10">No jobs available</div>
      ) : (
        <>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold sm:w-1/2 text-center text-green-500 mx-auto whitespace-nowrap">
            Latest Job Openings
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-5 gap-5">
            {allJobs?.map((job) => (
              <LatestJobCards key={job?._id} job={job} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LatestJobs;
