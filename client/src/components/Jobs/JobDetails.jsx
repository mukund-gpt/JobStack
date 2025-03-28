import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { baseUrl } from "@/utils/baseUrl";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSingleJob } from "@/redux/jobSlice";

const JobDetails = () => {
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/api/job/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          dispatch(setSingleJob(data.job));
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
    fetchSingleJob();
  }, [id]);

  useEffect(() => {
    let initiallyApplied =
      singleJob?.applications?.some((app) => app?.applicantId === user?._id) ||
      false;
    setIsApplied(initiallyApplied);
  }, [singleJob, user]);

  const applyJobHandler = async () => {
    if (!user?.profile?.resume) {
      toast.error("Plz upload resume..🤦‍♂️");
      return;
    }
    try {
      setIsApplying(true);
      const res = await fetch(`${baseUrl}/api/application/apply/${id}`, {
        method: "GET",
        credentials: "include",
      });
      console.log(res);

      const data = await res.json();
      if (data.success) {
        setIsApplied(true);
        toast.success(data.message);
        console.log(data.newApplication);
        const updatedApp = [
          ...(singleJob?.applications || []),
          data.newApplication,
        ];

        dispatch(setSingleJob({ ...singleJob, applications: updatedApp }));
      } else {
        toast.error(data.message);
        if (data.message === "Unauthorised") {
          navigate("/login");
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsApplying(false);
    }
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading job details...</p>
      </div>
    );
  }
  console.log(singleJob);

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <div className="mx-auto w-[90vw] min-w-[350px] sm:w-[80vw] m-3 mt-5 p-4 shadow-lg rounded-md shadow-lime-600">
            <div className="flex flex-wrap justify-between items-center sm:px-10">
              <div className="w-full sm:w-3/4 p-2">
                <h1 className="text-3xl text-center sm:text-left font-bold text-indigo-500">
                  {singleJob?.title}
                </h1>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start py-3 items-center">
                  <span className="badge p-2 text-sm font-bold text-amber-600 bg-white border border-gray-300">
                    {singleJob?.position} Openings
                  </span>
                  <span className="badge p-2 text-sm font-bold text-amber-600 bg-white border border-gray-300">
                    {singleJob?.jobType}
                  </span>
                  <span className="badge p-2 text-sm font-bold text-amber-600 bg-white border border-gray-300">
                    {singleJob?.salary} LPA
                  </span>
                </div>
              </div>
              <div className="w-full sm:w-auto p-2 flex justify-center sm:justify-end">
                <img
                  src={singleJob?.company?.logo}
                  alt="Job"
                  className="w-20 h-20 object-cover"
                />
              </div>
            </div>

            <h2 className="text-gray-500 font-bold ml-5 mt-5 p-2">
              Job Description
            </h2>
            <hr className="text-gray-500 mb-5 mx-2" />

            <div className="ml-2 sm:ml-10">
              <div className="flex gap-4 m-1 p-1">
                <h1 className="font-bold">Role:</h1>
                <p className="text-gray-800">{singleJob?.title}</p>
              </div>

              <div className="flex gap-4 m-1 p-1">
                <h1 className="font-bold">Location:</h1>
                <p className="text-gray-800">{singleJob?.location}</p>
              </div>

              <div className="flex gap-4 m-1 p-1">
                <h1 className="font-bold">Description</h1>
                <p className="text-gray-800">{singleJob?.description}</p>
              </div>

              <div className="flex gap-4 m-1 p-1">
                <h1 className="font-bold">Experience:</h1>
                <p className="text-gray-800">
                  {singleJob?.experienceLevel} yrs
                </p>
              </div>

              <div className="flex gap-4 m-1 p-1">
                <h1 className="font-bold">Salary:</h1>
                <p className="text-gray-800">{singleJob?.salary} LPA</p>
              </div>

              <div className="flex gap-4 m-1 p-1">
                <h1 className="font-bold">Total applicants:</h1>
                <p className="text-gray-800">
                  {singleJob?.applications.length}
                </p>
              </div>

              <div className="flex gap-4 m-1 p-1">
                <h1 className="font-bold">Website</h1>
                <p
                  className="text-gray-800 cursor-pointer hover:underline hover:text-blue-600"
                  onClick={() => {
                    let website = singleJob?.company?.website;
                    if (website && !website.startsWith("http")) {
                      website = `https://${website}`;
                    }

                    if (
                      website.startsWith("http://") ||
                      website.startsWith("https://")
                    ) {
                      window.open(website, "_blank");
                    }
                  }}
                >
                  {singleJob?.company?.website}
                </p>
              </div>

              <div className="flex gap-4 m-1 p-1">
                <h1 className="font-bold">Posted Date:</h1>
                <p className="text-gray-800">
                  {singleJob?.createdAt.split("T")[0]}
                </p>
              </div>
            </div>
            <div className="text-center m-3">
              {isApplied ? (
                <button className="btn btn-primary border-none bg-gray-400 hover:bg-gray-400 text-white text-[1.3rem] cursor-not-allowed">
                  Applied
                </button>
              ) : (
                <button
                  className={`btn btn-primary border-none ${
                    isApplying
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white text-[1.3rem]`}
                  onClick={isApplying ? null : applyJobHandler}
                >
                  {isApplying ? "Loading..." : "Apply Now"}
                </button>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default JobDetails;
