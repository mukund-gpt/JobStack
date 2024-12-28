import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const logoutHandler = () => {
    alert("logout");
  };
  return (
    <div>
      <div className="navbar bg-orange-500 text-white">
        <div className="flex-1">
          <a className="text-3xl font-bold cursor-pointer ml-4">
            <span>Job</span>
            <span className="text-black">Stack</span>
          </a>
        </div>
        <div className="flex-none gap-10 font-semibold">
          <div className="flex gap-6 text-2xl font-medium text-white">
            <Link
              to="/jobs"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Jobs
            </Link>
            <Link
              to="/browse"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Browse
            </Link>
            <Link
              to="/companies"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Companies
            </Link>
            <Link
              to="/jobs"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Jobs
            </Link>
          </div>

          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="secondary">LogIn</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary">Register</Button>
            </Link>

            <Button onClick={logoutHandler} variant="secondary">
              LogOut
            </Button>
          </div>

          <div className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
