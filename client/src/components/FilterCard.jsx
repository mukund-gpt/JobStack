import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const FilterCard = () => {
  const filterdata = [
    {
      filterType: "Location",
      array: ["Delhi", "noida", "kanpur", "mumbai", "banglore"],
    },
    {
      filterType: "Salary",
      array: ["0-3 LPA", "3-6 LPA", "6-12 LPA", "12-18 LPA", "18-24 LPA"],
    },
    {
      filterType: "Industry",
      array: [
        "Frontend developer",
        "backend developer",
        "data analyst",
        "Ai engineer",
      ],
    },
  ];
  return (
    <div>
      <div className="w-full">
        <h1 className="text-center text-purple-500 text-xl font-bold p-1 m-1">
          Filter
        </h1>
        <hr />
        <div className="m-2 p-2">
          <RadioGroup>
            {filterdata.map((data, index) => (
              <div key={index}>
                <h1 className="text-xl font-semibold text-amber-600 m-1 p-1">
                  {data.filterType}
                </h1>
                {data.array.map((item, index) => (
                  <div className="flex gap-1 items-center pl-3">
                    <RadioGroupItem
                      value={item}
                      className="h-4 w-4 rounded-full border-2 bg-white data-[state=checked]:border-white"
                    />
                    <label className="font-semibold text-[#a43dac]">
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
