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
      <div className="flex m-4 p-2 justify-between w-full sm:w-3/4 mx-auto">
        <Input
          className="w-fit border-purple-300 font-bold shadow-md shadow-purple-200"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button
          className=""
          onClick={() => navigate("/admin/companies/create")}
        >
          New Company
        </Button>
      </div>
      <CompaniesTable searchInput={searchInput} />
    </>
  );
};

export default Companies;
