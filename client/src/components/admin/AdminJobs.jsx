import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobs = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  useGetAllAdminJobs();
  return (
    <>
      <Navbar />
      <div className="flex m-4 p-2 justify-between w-full sm:w-3/4 mx-auto">
        <Input
          className="w-fit border-purple-300 font-bold shadow-md shadow-purple-200"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button onClick={() => navigate("/admin/jobs/create")}>
          Create New Job
        </Button>
      </div>
      <AdminJobsTable searchInput={searchInput} />
    </>
  );
};

export default AdminJobs;
