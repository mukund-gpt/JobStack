import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Navbar from "../shared/Navbar";
import toast from "react-hot-toast";
import { baseUrl } from "@/utils/baseUrl";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllCompanies, setSingleCompany } from "@/redux/companySlice";

const EditCompany = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const { singleCompany, allCompanies } = useSelector((store) => store.company);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    logo: "",
  });

  useEffect(() => {
    if (singleCompany) {
      setInput({
        companyName: singleCompany.companyName || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        logo: singleCompany.logo || "",
      });
    }
  }, [singleCompany]);

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setInput({ ...input, logo: file });
    if (file) setPreview(window.URL.createObjectURL(file));
    else setPreview("");
  };

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("companyName", input.companyName);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    formData.append("logo", input.logo);
    console.log([...formData]);
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/company/update/${id}`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        console.log(data);
        toast.success(data.message);
        dispatch(setAllCompanies([...allCompanies, data.company]));
        dispatch(setSingleCompany(null));
        setInput({
          companyName: "",
          description: "",
          website: "",
          location: "",
          logo: "",
        });
        setPreview("");

        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!singleCompany) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <Navbar />
        <div className="w-2/3 mx-auto mt-5">
          <div className="m-3">
            <Label className="m-1 p-1 font-bold text-amber-500">
              Company name
            </Label>
            <Input
              placeholder="Enter company name"
              className="m-1 p-1 font-bold placeholder-gray-400 w-[250px] border-purple-400"
              style={{ padding: "12px" }}
              onChange={changeEventHandler}
              name="companyName"
              value={input.companyName}
            />
          </div>

          <div className="m-3">
            <Label className="m-1 p-1 font-bold text-amber-500">
              Description
            </Label>
            <Input
              placeholder="Enter description"
              className="m-1 p-1 font-bold placeholder-gray-400 w-[250px] sm:w-[500px] border-purple-400"
              style={{ padding: "12px" }}
              onChange={changeEventHandler}
              name="description"
              value={input.description}
            />
          </div>

          <div className="m-3">
            <Label className="m-1 p-1 font-bold text-amber-500">
              Website Link
            </Label>
            <Input
              placeholder="Enter website"
              className="m-1 p-1 font-bold placeholder-gray-400 w-[250px] sm:w-[500px] border-purple-400"
              style={{ padding: "12px" }}
              onChange={changeEventHandler}
              name="website"
              value={input.website}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            {/* Left Column - Inputs */}
            <div>
              <div className="m-3">
                <Label className="m-1 p-1 font-bold text-amber-500">
                  Location
                </Label>
                <Input
                  placeholder="Enter location"
                  className="m-1 p-1 font-bold placeholder-gray-400 w-[250px] border-purple-400"
                  style={{ padding: "12px" }}
                  onChange={changeEventHandler}
                  name="location"
                  value={input.location}
                />
              </div>

              <div className="m-3">
                <Label className="m-1 p-1 font-bold text-amber-500">
                  Company Logo
                </Label>
                <Input
                  className="m-1 p-1 font-bold w-[250px] border-purple-400"
                  onChange={fileChangeHandler}
                  type="file"
                  name="logo"
                  accept="image/*"
                />
              </div>
            </div>

            {/* Right Column - Image Preview */}
            {preview && (
              <div className="m-3 flex justify-center items-center sm:justify-start">
                <img
                  src={preview}
                  alt="Logo"
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
            )}
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

export default EditCompany;
