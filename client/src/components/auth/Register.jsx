import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import { baseUrl } from "@/utils/baseUrl";
import jobImage from "../../assests/job.jpg";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";

const Register = () => {
  const [selectRole, setSelectRole] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const togglePasswordVisibilty = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!/^[0-9]{0,10}$/.test(value)) {
        setError("Phone number must contain only digits.");
      } else if (value.length !== 10) {
        setError("Phone number must be exactly 10 digits.");
      } else {
        setError("");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.role = selectRole;
    if (image) formData.image = image;

    if (
      !formData.fullname ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.role
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      console.log(formData);

      const form = new FormData();
      Object.keys(formData).forEach((key) => form.append(key, formData[key]));

      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        credentials: "include",
        body: form,
      });
      console.log(res);

      if (!res.ok) {
        throw new Error("Network Response was Not OK");
      }

      const data = await res.json();
      console.log(data);

      if (data.success) {
        dispatch(setUser(data.user));
        toast.success("Registration Success");
        navigate("/");
      } else {
        toast.error(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      setImage("");
    }
  };

  return (
    <>
      <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
        <div className="bg-[#dfa674] rounded-2xl flex md:w-4xl p-5 items-center">
          <div className="sm:w-400 px-8">
            <h2 className="font-bold text-3xl text-[#002D74] text-center">
              Register
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className="p-3 mt-8 rounded-xl border border-white bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                name="fullname"
                placeholder="Full name"
                value={formData.fullname || ""}
                onChange={handleChange}
              />
              <input
                className="p-3 rounded-xl border border-white bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={handleChange}
              />
              <input
                className="p-3 rounded-xl border border-white bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="tel"
                pattern="[0-9]{10}"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone || ""}
                onChange={handleChange}
              />
              {error && (
                <p className="text-red-500 text-sm text-bold">{error}</p>
              )}

              <div className="relative">
                <input
                  className="p-3 rounded-xl w-full border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password || ""}
                  onChange={handleChange}
                />
                <div
                  onClick={togglePasswordVisibilty}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-xl"
                >
                  {isPasswordVisible ? <RxEyeOpen /> : <GoEyeClosed />}
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <label
                  className={`flex items-center justify-center w-40 py-3 rounded-lg cursor-pointer font-medium text-white ${
                    selectRole === "student"
                      ? "bg-blue-600 border-blue-600"
                      : "bg-gray-300 border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="role"
                    value="student"
                    checked={selectRole === "student"}
                    onChange={() => setSelectRole("student")}
                    className="hidden"
                  />
                  Student
                </label>
                <label
                  className={`flex items-center justify-center w-40 py-3 rounded-lg cursor-pointer font-medium text-white ${
                    selectRole === "recruiter"
                      ? "bg-blue-600 border-blue-600"
                      : "bg-gray-300 border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="role"
                    value="recruiter"
                    checked={selectRole === "recruiter"}
                    onChange={() => setSelectRole("recruiter")}
                    className="hidden"
                  />
                  Recruiter
                </label>
              </div>

              {/* Image Upload */}
              {selectRole === "student" && (
                <div className="flex items-center justify-between p-2 bg-white rounded shadow-md w-full space-x-4">
                  <label
                    htmlFor="fileInput"
                    className="text-sm w-1/3 font-medium text-gray-700"
                  >
                    Upload Profile:
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-sm w-2/3 text-gray-600 file:mr-1 file:py-2 file:px-2 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              )}

              <button
                className="text-white py-2 rounded-xl hover:scale-105 duration-300 bg-green-600 hover:bg-green-700 font-medium"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Register"
                )}
              </button>
            </form>

            <div className="m-2 text-sm flex justify-center items-center container-mr">
              <Link to="/login">
                <button className="hover:border register text-white bg-[#002c74c5] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002D74] font-semibold duration-300">
                  Login
                </button>
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <img
              src={jobImage}
              alt="Job Illustration"
              className="rounded-2xl h-full object-cover max-h-96"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
