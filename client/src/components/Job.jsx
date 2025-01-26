import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { baseUrl } from "@/utils/baseUrl";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setBookmarks } from "@/redux/authSlice";

const Job = ({ job }) => {
  const { bookmarks } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const daysAgoFunction = () => {
    const date = new Date(job?.createdAt);
    const timeDiff = Math.abs(new Date() - date);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return days;
  };

  const isBookmarked = (job) => {
    return bookmarks.some((bookmark) => bookmark._id === job?._id);
  };

  const bookmarkHandler = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/user/bookmark/${job?._id}`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        if (data.type === "saved") {
          toast.success(data.message);
        } else {
          toast.success(data.message);
        }
        dispatch(setBookmarks(data.bookmarks));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="relative bg-[#fefcff] border border-pink-200 rounded-lg p-3 sm:p-5 shadow-lg shadow-orange-200">
        <div>
          <p className="text-gray-400 absolute top-2 right-2 text-sm">
            {daysAgoFunction() === 0 ? (
              <span>Today</span>
            ) : (
              <span>{daysAgoFunction()} days ago</span>
            )}
          </p>
          <h1 className="text-purple-500 font-bold text-xl">
            {job?.company?.companyName}
          </h1>
          <h1 className="text-sm text-gray-500">{job?.location}</h1>
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl my-2 font-bold from-accent-foreground text-green-600">
            {job?.title}
          </h1>
          <p className="my-1 sm:my-2 text-black">{job?.description} </p>
        </div>
        <div className="font-bold flex flex-wrap text-nowrap gap-1 sm:gap-2">
          <span className="badge p-1.5 sm:p-2.5 text-[10px] sm:text-[14px] text-amber-600 bg-white border-gray-300">
            {job?.position} openings
          </span>
          <span className="badge p-1.5 sm:p-2.5 text-[10px] sm:text-[14px] text-red-400 bg-white border-gray-300">
            {job?.jobType}
          </span>
          <span className="badge p-1.5 sm:p-2.5 text-[10px] sm:text-[14px] text-green-400 bg-white border-gray-300">
            {job?.salary}
          </span>
        </div>
        <div className="flex justify-around mt-3">
          <Link to={`/jobs/details/${job?._id}`}>
            <Button className="bg-red-400 hover:bg-red-500 p-2 sm:px-3">
              Details
            </Button>
          </Link>
          <Button
            className="bg-blue-400 hover:bg-blue-500 p-2 sm:px-3"
            onClick={bookmarkHandler}
          >
            {isBookmarked(job) ? <>Saved</> : <>Save for Later</>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Job;
