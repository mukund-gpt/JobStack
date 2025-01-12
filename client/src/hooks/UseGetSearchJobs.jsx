import { setSearchJobs, setSearchQuery } from "@/redux/jobSlice";
import { baseUrl } from "@/utils/baseUrl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const UseGetSearchJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { searchQuery } = useSelector((store) => store.job);
  // console.log(searchQuery);

  useEffect(() => {
    if (!searchQuery) return;
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/api/job?keyword=${searchQuery}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          dispatch(setSearchQuery(""));
          dispatch(setSearchJobs(data.jobs));
          setLoading(false);
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
  return { loading };
};

export default UseGetSearchJobs;
