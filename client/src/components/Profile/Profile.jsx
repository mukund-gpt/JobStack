import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import { Contact, Mail, UserRoundPen } from "lucide-react";
import Footer from "../shared/Footer";
import AppliedJobTable from "./AppliedJobTable";
import EditProfileDialog from "./EditProfileDialog";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const skills = user?.profile?.skills;
  return (
    <div>
      <Navbar />
      <div className="w-full h-full min-w-[350px]">
        <div className="w-[90vw] min-w-[350px] sm:w-[80vw] mx-auto shadow-md shadow-amber-400 rounded-md">
          <div>
            <h1 className="text-4xl font-bold text-violet-500 text-center m-4">
              Profile
            </h1>
            <hr />
          </div>
          <div className="w-full flex justify-end">
            <UserRoundPen
              className="h-6 w-6 text-blue-500 m-2 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>

          <div className="w-3/4 sm:w-2/3 ml-5 sm:ml-12 flex gap-4 sm:gap-8 items-center">
            <div className="avatar">
              <div className="w-24 rounded-xl">
                <img src={user?.profile?.profilePic} />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-blue-500">
                {user?.fullname}
              </h1>
              <p className="font-semibold text-blue-300">
                {user?.profile?.bio}
              </p>
            </div>
          </div>

          <div className="ml-3 sm:ml-8 mt-3 sm:mt-8 p-2">
            <div className="flex gap-3 m-1 sm:m-2">
              <Mail className="min-h-6 min-w-6" />
              {user?.email}
            </div>
            <div className="flex gap-3 m-1 sm:m-2">
              <Contact className="min-h-6 min-w-6" />
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
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <p className="m-2">Resume</p>
              <p className="cursor-pointer hover:text-gray-700 hover:underline">
                <a href={user?.profile?.resume} target="_blank">
                  {user?.profile?.resumeOriginalName}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Applied Jobs  */}
        <AppliedJobTable />
        <EditProfileDialog open={open} setOpen={setOpen} />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
