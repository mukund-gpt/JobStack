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
      <div className="w-full min-w-[350px]">
        <div className="flex gap-3 mt-2 p-2 justify-between w-full sm:w-3/4 sm:mx-auto">
          <Input
            className="sm:w-fit border-purple-300 font-bold shadow-md shadow-purple-200"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>
            Create New Job
          </Button>
        </div>
      </div>
      <AdminJobsTable searchInput={searchInput} />
    </>
  );
};

export default AdminJobs;
