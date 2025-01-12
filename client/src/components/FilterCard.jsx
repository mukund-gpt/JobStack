import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";

const filterdata = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Noida",
      "Kanpur",
      "Mumbai",
      "Bangalore",
      "Pune",
      "Hyderabad",
      "Chennai",
      "Kolkata",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Data Analyst",
      "AI Engineer",
      "Full Stack Developer",
      "Cybersecurity Specialist",
      "Cloud Engineer",
      "Product Manager",
      "UI/UX Designer",
    ],
  },
  {
    filterType: "Salary",
    array: [
      "0-3 LPA",
      "3-6 LPA",
      "6-12 LPA",
      "12-18 LPA",
      "18-24 LPA",
      "24-30 LPA",
      "30+ LPA",
    ],
  },
  {
    filterType: "Experience",
    array: ["Fresher", "1-3 Years", "3-5 Years", "5-8 Years", "8+ Years"],
  },
  {
    filterType: "Job Type",
    array: ["Full-Time", "Part-Time", "Internship", "Contract", "Remote"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  // console.log(selectedValue);
  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div>
      <h1 className="text-center text-purple-500 text-xl font-bold">Filter</h1>
      <div className="w-full h-[80vh] overflow-y-auto scrollbar-hide">
        <div className="p-1">
          <RadioGroup
            value={selectedValue}
            onValueChange={(value) => setSelectedValue(value)}
          >
            {filterdata.map((data, index) => (
              <div key={index}>
                <h1 className="text-xl font-semibold text-amber-600 m-1 p-1 md:pl-3">
                  {data.filterType}
                </h1>
                {data.array.map((item, index) => (
                  <div
                    className="flex gap-1 items-center pl-2 sm:pl-3 md:pl-5"
                    key={index}
                  >
                    <RadioGroupItem
                      value={item}
                      id={item}
                      className="h-3 sm:h-4 w-3 sm:w-4 rounded-full border-2 bg-white data-[state=checked]:border-white"
                    />
                    <label
                      htmlFor={item}
                      className="font-semibold text-[#a43dac] cursor-pointer"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default FilterCard;
