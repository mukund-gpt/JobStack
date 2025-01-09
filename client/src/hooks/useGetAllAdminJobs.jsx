import { setAdminJobs } from "@/redux/jobSlice";
import { baseUrl } from "@/utils/baseUrl";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/job/admin`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (data.success) {
          dispatch(setAdminJobs(data.jobs));
        } else {
          toast(data.message);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, []);
};

export default useGetAllAdminJobs;
