import React from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { baseUrl } from "@/utils/baseUrl";
import { setBookmarks, setUser } from "@/redux/authSlice";
import { setAdminJobs, setSearchJobs, setSearchQuery } from "@/redux/jobSlice";
import { setAllCompanies, setSingleCompany } from "@/redux/companySlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  // console.log(user);

  const logoutHandler = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      toast.success(data.message);
      if (data.success) {
        dispatch(setUser(null));
        dispatch(setAdminJobs([]));
        dispatch(setSearchJobs([]));
        dispatch(setSearchQuery(""));
        dispatch(setAllCompanies([]));
        dispatch(setSingleCompany(null));
        dispatch(setBookmarks([]));
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <div>
      <div className="navbar bg-orange-500 text-white min-w-[350px]">
        <div className="flex-1">
          <Link to="/" className="text-2xl sm:text-3xl font-bold mx-1 sm:ml-4">
            <span>Job</span>
            <span className="text-black">Stack</span>
          </Link>
        </div>
        <div className="flex-none gap-3 sm:gap-10 font-semibold">
          {
            <div className="flex gap-2 sm:gap-6 text-xl sm:text-2xl font-medium text-white">
              {user?.role === "recruiter" ? (
                <>
                  <Link
                    to="/admin/companies"
                    className="hover:text-blue-500 transition-colors duration-300"
                  >
                    Companies
                  </Link>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-blue-500 transition-colors duration-300"
                  >
                    Jobs
                  </Link>
                  <Button onClick={logoutHandler} variant="secondary">
                    LogOut
                  </Button>
                </>
              ) : user?.role === "student" ? (
                <Link
                  to="/jobs"
                  className="hover:text-blue-500 transition-colors duration-300"
                >
                  Jobs
                </Link>
              ) : (
                <>
                  <Link
                    to="/jobs"
                    className="hover:text-blue-500 transition-colors duration-300"
                  >
                    Jobs
                  </Link>
                  <Link to="/login">
                    <Button variant="secondary">LogIn</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="secondary">Register</Button>
                  </Link>
                </>
              )}
            </div>
          }

          {user?.role === "student" && (
            <div className="dropdown dropdown-end relative">
              <div
                tabIndex={0}
                className="btn-circle m-1 p-0 avatar cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full transition-all">
                  <img
                    src={user?.profile?.profilePic}
                    alt="Profile"
                    className="object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-lg shadow-lg w-52 text-gray-700 absolute right-0 mt-2 z-50"
              >
                <li
                  className="hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  <a>Profile</a>
                </li>
                <li
                  className="hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => navigate("/bookmarks")}
                >
                  <a>Bookmarks</a>
                </li>
                <li
                  className="hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                  onClick={logoutHandler}
                >
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
