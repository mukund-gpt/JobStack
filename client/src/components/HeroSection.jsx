import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState(""); // Track the input query
  const navigate = useNavigate(); // Navigate to other routes

  // Handle query input change
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  // Search job handler with navigation
  const searchJobHandler = () => {
    if (query.trim()) {
      // Navigate to browse page with query as search param
      navigate(`/browse?search=${query}`);
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="w-full text-center mt-5">
        <h1 className="flex flex-col justify-center items-center font-bold">
          <span className="m-2 text-5xl text-green-500">Jobstack</span>
          <p className="m-2 p-2 text-3xl text-red-500 animate-typewriter overflow-hidden whitespace-nowrap">
            Career Opportunities at Your Fingertips
          </p>
        </h1>

        <div className="mt-8 flex justify-center items-center space-x-4">
          <input
            type="text"
            placeholder="Find your dream job here"
            value={query} // Bind input to query state
            onChange={handleQueryChange} // Update state when input changes
            className="px-6 py-3 w-2/5 border text-black bg-white border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={searchJobHandler} // Trigger search handler on click
            className="bg-green-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-600 transition duration-300"
          >
            <Search className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
