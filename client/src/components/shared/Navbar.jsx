import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  // console.log(user);

  const logoutHandler = () => {
    alert("logout");
  };
  return (
    <div>
      <div className="navbar bg-orange-500 text-white min-w-[400px]">
        <div className="flex-1">
          <Link to="/" className="text-2xl sm:text-3xl font-bold mx-1 sm:ml-4">
            <span>Job</span>
            <span className="text-black">Stack</span>
          </Link>
        </div>
        <div className="flex-none gap-3 sm:gap-10 font-semibold">
          {user && (
            <div className="flex gap-3 sm:gap-6 text-xl sm:text-2xl font-medium text-white">
              {user?.role === "student" ? (
                <>
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
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          )}

          <div className="flex gap-2 sm:gap-4">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="secondary">LogIn</Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary">Register</Button>
                </Link>
              </>
            ) : (
              <Button onClick={logoutHandler} variant="secondary">
                LogOut
              </Button>
            )}
          </div>

          {user && (
            <Link to="/profile">
              <div className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.profile?.profilePic} />
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
