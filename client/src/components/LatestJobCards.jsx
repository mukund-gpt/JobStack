import React from "react";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-[#fefcff] border border-pink-200 rounded-lg p-5 shadow-lg shadow-orange-200 cursor-pointer"
      onClick={() => navigate(`/jobs/details/${job?._id}`)}
    >
      <div>
        <h1 className="text-purple-500 font-bold text-xl">
          {job?.company?.companyName}
        </h1>
        <h1 className="text-sm text-gray-500">{job?.location}</h1>
      </div>
      <div>
        <h1 className="text-2xl my-2 font-bold from-accent-foreground text-green-600">
          {job?.title}
        </h1>
        <p className="my-2 text-black">{job?.description} </p>
      </div>
      <div className="font-bold flex text-nowrap gap-2">
        <span className="badge p-2.5 text-amber-600 bg-white border-gray-300">
          {job?.position} openings
        </span>
        <span className="badge p-2.5 text-red-400 bg-white border-gray-300">
          {job?.jobType}
        </span>
        <span className="badge p-2.5 text-green-400 bg-white border-gray-300">
          {job?.salary}
        </span>
      </div>
    </div>
  );
};

export default LatestJobCards;
