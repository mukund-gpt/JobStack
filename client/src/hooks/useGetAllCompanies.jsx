import { setAllCompanies } from "@/redux/companySlice";
import { baseUrl } from "@/utils/baseUrl";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/company/getCompanies`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          dispatch(setAllCompanies(data.companies));
        } else {
          toast(data.message);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    };
    fetchAllCompanies();
  }, []);
};

export default useGetAllCompanies;
