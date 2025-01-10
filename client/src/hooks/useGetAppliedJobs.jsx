import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "@/utils/baseUrl";

const useGetAppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/application/all`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setAppliedJobs(data.applications);
        } else {
          toast(data.message);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  return { appliedJobs, loading };
};

export default useGetAppliedJobs;
