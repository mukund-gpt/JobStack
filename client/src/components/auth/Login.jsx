import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import { baseUrl } from "@/utils/baseUrl";
import jobImage from "../../assests/job.jpg";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";

const Login = () => {
  const [selectRole, setSelectRole] = useState("");
  const [formData, setFormData] = useState({});
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibilty = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.role = selectRole;

    if (!formData.email || !formData.password || !formData.role) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      console.log(formData);
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      console.log(res);

      if (!res.ok) {
        throw new Error("Network Response was Not OK");
      }

      const data = await res.json();
      console.log(data);

      if (data.success) {
        dispatch(setUser(data.user));
        toast.success(`${data.message}`);
        navigate("/");
      } else {
        toast.error(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
        <div className="bg-[#dfa674] rounded-2xl flex md:w-4xl p-5 items-center">
          <div className="sm:w-400 px-8">
            <h2 className="mb-4 font-bold text-3xl text-[#002D74] text-center">
              LogIn
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className="p-3 rounded-xl border border-white bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={handleChange}
              />

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

              <div className="flex gap-4">
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

              <button
                className="text-white py-2 rounded-xl hover:scale-105 duration-300 bg-green-600 hover:bg-green-700 font-medium"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="mt-1 text-sm flex justify-between items-center container-mr">
              <p className="mr-3 md:mr-0 text-black">Not a member,</p>
              <Link to="/register">
                <button className="hover:border text-white bg-[#002c74c5] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002D74] font-semibold duration-300">
                  Register here
                </button>
              </Link>
            </div>
            <div
              className="cursor-pointer text-sm text-[#002c74c5] font-bold"
              onClick={() => navigate("/forget-password")}
            >
              Forget Password
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

export default Login;
