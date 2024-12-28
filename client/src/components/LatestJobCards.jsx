import React from "react";

const LatestJobCards = () => {
  return (
    <div className="bg-[#fefcff] border border-pink-200 rounded-lg p-5 shadow-lg shadow-orange-200">
      <div>
        <h1 className="text-purple-500 font-bold text-xl">Company name</h1>
        <h1 className="text-sm text-gray-500">India</h1>
      </div>
      <div>
        <h1 className="text-2xl my-2 font-bold from-accent-foreground text-green-600">
          Job name
        </h1>
        <p className="my-2 text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam porro
          iste reprehenderit dolorum veritatis nemo minus. Iste et aspernatur
          porro quisquam facere tempore unde, beatae incidunt natus delectus
        </p>
      </div>
      <div className="font-bold flex text-nowrap gap-2">
        <span className="badge p-2.5 text-amber-600 bg-white border-gray-300">
          12 openings
        </span>
        <span className="badge p-2.5 text-red-400 bg-white border-gray-300">
          Part Time
        </span>
        <span className="badge p-2.5 text-green-400 bg-white border-gray-300">
          24 LPA
        </span>
      </div>
    </div>
  );
};

export default LatestJobCards;
