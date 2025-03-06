import { setBookmarks } from "@/redux/authSlice";
import { baseUrl } from "@/utils/baseUrl";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const useGetAllBookmarks = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllBookmarks = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/user/bookmark/all`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          dispatch(setBookmarks(data.bookmarks));
        } else {
          toast(data.message);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    };
    fetchAllBookmarks();
  }, []);
};

export default useGetAllBookmarks;
