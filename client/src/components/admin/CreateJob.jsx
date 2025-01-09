import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Navbar from "../shared/Navbar";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import "./createJob.css";
import { baseUrl } from "@/utils/baseUrl";
import { useNavigate } from "react-router-dom";
const CreateJob = () => {
  const { allCompanies } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({});

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = async () => {
    console.log(input);

    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/job/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        console.log(data);
        setInput({});
        navigate("/admin/jobs");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full">
        <Navbar />
        <div className="w-2/3 mx-auto mt-5 font-bold">
          <h1 className="text-2xl font-bold text-center mb-4">Create Job</h1>

          <div className="m-3">
            <Label className="m-1 p-1 font-bold text-amber-500">
              Job Title
            </Label>
            <Input
              placeholder="Enter job title"
              className="m-1 p-1 w-[250px] border-purple-400"
              name="title"
              value={input.title || ""}
              onChange={changeEventHandler}
            />
          </div>

          <div className="m-3">
            <Label className="m-1 p-1 font-bold text-amber-500">
              Description
            </Label>
            <Input
              placeholder="Enter description"
              className="m-1 p-1 w-[250px] sm:w-[500px] border-purple-400"
              name="description"
              value={input.description || ""}
              onChange={changeEventHandler}
            />
          </div>

          <div className="m-3">
            <Label className="m-1 p-1 font-bold text-amber-500">
              Requirements
            </Label>
            <Input
              placeholder="Enter requirements"
              className="m-1 p-1 w-[250px] sm:w-[500px] border-purple-400"
              name="requirements"
              value={input.requirements || ""}
              onChange={changeEventHandler}
            />
          </div>

          <div className="m-3">
            <Label className="m-1 p-1 font-bold text-amber-500">Salary</Label>
            <Input
              placeholder="Enter salary"
              className="m-1 p-1 w-[250px] border-purple-400 input-no-spinner"
              name="salary"
              type="number"
              min={0}
              value={input.salary || 0}
              onChange={changeEventHandler}
            />
          </div>

          <div className="m-3">
            <Label className="m-1 p-1 font-bold text-amber-500">
              Experience Level
            </Label>
            <Input
              placeholder="Enter experience level"
              className="m-1 p-1 w-[250px] border-purple-400"
              name="experienceLevel"
              type="number"
              min={0}
              value={input.experienceLevel || ""}
              onChange={changeEventHandler}
            />
          </div>

          <div className="m-3">
            <Label className="m-1 p-1 font-bold text-amber-500">Job Type</Label>
            <Input
              placeholder="Enter job type (e.g., Full-time, Part-time)"
              className="m-1 p-1 w-[250px] border-purple-400"
              name="jobType"
              value={input.jobType || ""}
              onChange={changeEventHandler}
            />
          </div>

          <div className="m-3">
            <Label className="m-1 p-1 font-bold text-amber-500">Location</Label>
            <Input
              placeholder="Enter location"
              className="m-1 p-1 w-[250px] border-purple-400"
              name="location"
              value={input.location || ""}
              onChange={changeEventHandler}
            />
          </div>

          <div className="m-3">
            <Label className="m-1 p-1 font-bold text-amber-500">Position</Label>
            <Input
              placeholder="Enter position"
              className="m-1 p-1 w-[250px] border-purple-400"
              name="position"
              type="number"
              min={0}
              value={input.position || ""}
              onChange={changeEventHandler}
            />
          </div>

          <div className="m-3">
            <Label className="m-1 p-1 font-bold text-amber-500">
              Company ID
            </Label>
            <select
              name="companyId"
              value={input.companyId || ""}
              onChange={changeEventHandler}
              className="m-1 p-1 w-[250px] border-purple-400 font-bold text-gray-700 bg-white cursor-pointer"
            >
              <option value="" disabled>
                Select a company
              </option>
              {allCompanies?.map((company) => (
                <option
                  key={company?._id}
                  value={company?._id}
                  className="cursor-pointer"
                >
                  {company?.companyName}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-primary m-3 text-white disabled:text-white w-20"
            onClick={submitHandler}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateJob;
