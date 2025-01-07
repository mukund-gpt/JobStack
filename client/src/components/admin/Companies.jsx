import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="flex m-4 p-2 justify-between">
        <Input className="w-fit" />
        <Button
          className=""
          onClick={() => navigate("/admin/companies/create")}
        >
          New Company
        </Button>
      </div>
      <CompaniesTable />
    </>
  );
};

export default Companies;
