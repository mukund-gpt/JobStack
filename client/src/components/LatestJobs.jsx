import React from "react";
import LatestJobCards from "./LatestJobCards";

const LatestJobs = () => {
  const random = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="w-full my-5">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold sm:w-1/2 text-center text-orange-500 mx-auto whitespace-nowrap">
        Latest Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-5 gap-5">
        {random.map((item, index) => (
          <LatestJobCards key={index} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
