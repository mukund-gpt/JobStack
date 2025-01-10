import { setSearchJobs, setSearchQuery } from "@/redux/jobSlice";
import { baseUrl } from "@/utils/baseUrl";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const UseGetSearchJobs = () => {
  const dispatch = useDispatch();

  const { searchQuery } = useSelector((store) => store.job);
  // console.log(searchQuery);

  useEffect(() => {
    if (!searchQuery) return;
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/job?keyword=${searchQuery}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          dispatch(setSearchQuery(null));
          dispatch(setSearchJobs(data.jobs));
        } else {
          toast(data.message);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    };
    fetchJobs();
  }, [searchQuery]);
};

export default UseGetSearchJobs;
