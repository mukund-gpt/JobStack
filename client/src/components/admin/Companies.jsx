import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";

const Companies = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  useGetAllCompanies();
  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="flex gap-2 min-w-[350px] p-2 justify-between sm:w-3/4 m-2 sm:mx-auto my-4">
          <Input
            className="sm:w-fit max-w-fit border-purple-300 font-bold shadow-md shadow-purple-200"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button
            className=""
            onClick={() => navigate("/admin/companies/create")}
          >
            New Company
          </Button>
        </div>
      </div>

      <CompaniesTable searchInput={searchInput} />
    </>
  );
};

export default Companies;
