import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./shared/Navbar";
import { Contact, Mail, UserRoundPen } from "lucide-react";
import Footer from "./shared/Footer";
import AppliedJobTable from "./AppliedJobTable";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const skills = [1, 2, 3, 4, 5];
  return (
    <div>
      <Navbar />
      <div className="w-full h-full">
        <div className="w-[90vw] sm:w-[80vw] mx-auto shadow-md shadow-amber-400 rounded-md">
          <div>
            <h1 className="text-4xl font-bold text-violet-500 text-center m-4">
              Profile
            </h1>
            <hr />
          </div>
          <div className="w-full flex justify-end">
            <UserRoundPen className="h-6 w-6 text-blue-500 m-2 cursor-pointer" />
          </div>

          <div className="w-3/4 sm:w-2/3 mx-auto flex gap-8 justify-center items-center">
            <div className="avatar">
              <div className="w-24 rounded-xl">
                <img src={user?.profile?.profilePic} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-500">
                {user?.fullname}
              </h1>
              <p className="font-semibold text-blue-300">
                Lorem ipsum dolor sit,
              </p>
            </div>
          </div>

          <div className="ml-3 sm:ml-8 mt-3 sm:mt-8 p-2">
            <div className="flex gap-3 m-1 sm:m-2">
              <Mail className="h-6 w-6" />
              {user?.email}
            </div>
            <div className="flex gap-3 m-1 sm:m-2">
              <Contact className="h-6 w-6" />
              {user?.phone}
            </div>

            <div className="flex items-center">
              <p className="m-1 sm:m-3">Skills </p>
              <div className="flex flex-wrap">
                {skills.map((item, index) => (
                  <div
                    key={index}
                    className="badge m-1 sm:m-2 bg-white text-red-500 font-bold text-xs sm:text-sm p-1 sm:p-3 border-gray-300"
                  >
                    Hello
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <p className="m-2">Resume</p>
              <p className="cursor-pointer hover:text-gray-700 hover:underline">
                Resume.pdf
              </p>
            </div>
          </div>
        </div>

        {/* Applied Jobs  */}
        <AppliedJobTable />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
