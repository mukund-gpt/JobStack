import React from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const JobDetails = () => {
  const isApplied = false;
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <div className="mx-auto w-[90vw] min-w-[300px] sm:w-[80vw] m-3 mt-5 p-4 shadow-lg rounded-md shadow-lime-600">
            <div className="flex flex-wrap justify-between items-center">
              <h1 className="text-2xl w-full sm:w-1/2 mb-2 sm:mb-0 text-center font-bold text-indigo-500">
                FrontEnd Developer
              </h1>
            </div>

            <div className="w-full sm:w-1/2 flex flex-wrap gap-2 justify-center m-2 sm:m-3 items-center">
              <span className="badge p-2 text-sm font-bold text-amber-600 bg-white border border-gray-300">
                12 Openings
              </span>
              <span className="badge p-2 text-sm font-bold text-red-400 bg-white border border-gray-300">
                Part Time
              </span>
              <span className="badge p-2 text-sm font-bold text-green-400 bg-white border border-gray-300">
                24 LPA
              </span>
            </div>

            <h2 className="text-gray-500 font-bold ml-5 mt-5 p-2">
              Job Description
            </h2>
            <hr className="text-gray-500 mb-5 mx-2" />

            <div className="ml-2 sm:ml-10">
              <div className="flex gap-4 m-1 p-1">
                <h1 className="font-bold">Role:</h1>
                <p className="text-gray-800">Frontend developer</p>
              </div>

              <div className="flex gap-4 m-1 p-1">
                <h1 className="font-bold">Location:</h1>
                <p className="text-gray-800">Hyderabad</p>
              </div>

              <div className="flex gap-4 m-1 p-1">
                <h1 className="font-bold">Descriptoin</h1>
                <p className="text-gray-800">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente, nam.
                </p>
              </div>

              <div className="flex gap-4 m-1 p-1">
                <h1 className="font-bold">Experience:</h1>
                <p className="text-gray-800">4yrs</p>
              </div>

              <div className="flex gap-4 m-1 p-1">
                <h1 className="font-bold">Salary:</h1>
                <p className="text-gray-800">34 lpa</p>
              </div>

              <div className="flex gap-4 m-1 p-1">
                <h1 className="font-bold">Total applicants:</h1>
                <p className="text-gray-800">5</p>
              </div>

              <div className="flex gap-4 m-1 p-1">
                <h1 className="font-bold">Posted Date:</h1>
                <p className="text-gray-800">18-10-2024</p>
              </div>
            </div>
            <div className="text-center m-3">
              {isApplied ? (
                <>
                  <button className="btn btn-primary border-none text-white  bg-gray-400 text-[1.3rem]">
                    Applied
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-primary border-none bg-green-500 text-white text-[1.3rem]">
                    Apply
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default JobDetails;
