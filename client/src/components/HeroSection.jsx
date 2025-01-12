import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = () => {
    if (query?.trim()) {
      dispatch(setSearchQuery(query));
      navigate(`/browse?search=${query}`);
    }
  };

  return (
    <div className="bg-gray-50 py-8 sm:py-12">
      <div className="w-full text-center mt-2 sm:mt-5">
        <h1 className="flex flex-col justify-center items-center font-bold">
          <span className="m-2 text-5xl text-green-500">Jobstack</span>
          <p className="m-1 p-1 text-xl sm:text-3xl text-red-500 animate-typewriter overflow-hidden whitespace-nowrap">
            Career Opportunities at Your Fingertips
          </p>
        </h1>

        <div className="mt-8 flex justify-center items-center space-x-4">
          <input
            type="text"
            placeholder="Find your dream job here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 sm:px-6 py-3 w-3/5 sm:w-2/5 border text-black bg-white border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={searchJobHandler}
            className="bg-green-500 text-white px-4 sm:px-6 py-3 rounded-md shadow-lg hover:bg-green-600 transition duration-300"
          >
            <Search className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
