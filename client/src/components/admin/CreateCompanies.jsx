import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { baseUrl } from "@/utils/baseUrl";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { useNavigate } from "react-router-dom";

const CreateCompanies = () => {
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createCompanyHandler = async () => {
    if (!companyName) {
      toast.error("Company name is required");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/company/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ companyName: companyName }),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success) {
        dispatch(setSingleCompany(data.company));
        toast.success(data.message);
        navigate(`/admin/companies/edit/${data.company._id}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="w-3/4 sm:w-2/3 lg:w-1/3 flex flex-col p-4 mx-auto mt-6">
          <h1 className="p-2 m-2 text-2xl font-bold text-purple-600">
            Company Name
          </h1>
          <Input
            className="flex-1 p-3 my-4 w-full !text-xl"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <Button
            className="btn btn-primary w-fit self-end mt-4"
            onClick={createCompanyHandler}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Company"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateCompanies;
