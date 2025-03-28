import { useInView } from "framer-motion";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      key={job?._id}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="bg-[#fefcff] border border-pink-200 rounded-md p-5 shadow-md shadow-orange-200 cursor-pointer"
        onClick={() => navigate(`/jobs/details/${job?._id}`)}
      >
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-purple-500 font-bold text-xl">
              {job?.company?.companyName}
            </h1>
            <h1 className="text-sm text-gray-500">{job?.location}</h1>
          </div>
          <div className="flex items-end">
            <img src={job?.company?.logo} alt="image" className="h-8" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl my-2 font-bold from-accent-foreground text-purple-500">
            {job?.title}
          </h1>
          <p className="my-2 text-black">{job?.description} </p>
        </div>
        <div className="font-bold flex text-nowrap gap-2">
          <span className="badge p-2.5  bg-white border-gray-300">
            {job?.position} openings
          </span>
          <span className="badge p-2.5 bg-white border-gray-300">
            {job?.jobType}
          </span>
          <span className="badge p-2.5 bg-white border-gray-300">
            {job?.salary}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
