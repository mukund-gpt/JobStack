import React, { useState, useEffect } from "react";
import zigzagsvg from "../assets/zigzag.svg";
const TopCompanies = () => {
  const [svgs, setSvgs] = useState([]);

  useEffect(() => {
    const importSvgs = async () => {
      const svgFiles = import.meta.glob("../assets/TopCompanies/*.svg");
      console.log(svgFiles);

      const svgArray = await Promise.all(
        Object.entries(svgFiles).map(async ([path, importer]) => ({
          path,
          url: await importer().then((mod) => mod.default), // Get the URL
        }))
      );
      setSvgs(svgArray);
    };

    importSvgs();
  }, []);

  return (
    <div>
      <div className="relative text-center p-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-500 relative inline-block p-4">
          Top Companies
        </h1>
        <img
          src={zigzagsvg}
          className="absolute left-1/2 transform -translate-x-1/2 top-6"
          style={{ width: "150px", height: "120px" }}
        />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {svgs.map((svg, index) => (
          <img
            key={index}
            src={svg.url}
            alt={`SVG ${index}`}
            className="w-20 h-20 mx-auto"
          />
        ))}
      </div>
    </div>
  );
};

export default TopCompanies;
