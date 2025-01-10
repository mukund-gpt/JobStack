import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import toast from "react-hot-toast";
import { baseUrl } from "@/utils/baseUrl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Check, X } from "lucide-react";

const Applications = () => {
  const { id } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/api/application/applicants/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        // console.log(data);

        if (data.success) {
          setApplications(data.applications);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.error(err);
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [id]);

  const statusHandler = async (status, id) => {
    // console.log(status, id);

    try {
      const res = await fetch(`${baseUrl}/api/application/update/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      });

      const data = await res.json();
      console.log(data);
      if (data.success) {
        const updatedApplications = applications.map((app) =>
          app?._id === id ? { ...app, status: status } : app
        );
        setApplications(updatedApplications);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <>
        <Navbar />
        <div className="w-full h-[80vh] flex items-center justify-center text-2xl text-gray-400">
          No Applicants found
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="w-full md:w-4/5 p-2 mx-auto">
          <h1 className="text-2xl text-purple-500 font-bold text-center m-2 p-2">
            Applications
          </h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {applications?.map((application) => (
                <TableRow
                  key={application?._id}
                  className={`${
                    application?.status === "accepted"
                      ? "bg-green-100 hover:bg-green-200"
                      : application?.status === "rejected"
                      ? "bg-red-100 hover:bg-red-200"
                      : "bg-yellow-100 hover:bg-yellow-200"
                  }`}
                >
                  <TableCell>{application?.applicantId?.fullname}</TableCell>
                  <TableCell>{application?.applicantId?.email}</TableCell>
                  <TableCell>{application?.applicantId?.phone}</TableCell>
                  <TableCell>
                    <a
                      href={application?.applicantId?.profile?.resume}
                      target="_blank"
                      className="hover:underline"
                    >
                      {application?.applicantId?.profile?.resumeOriginalName}
                    </a>
                  </TableCell>

                  <TableCell>{application?.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right flex justify-end items-center">
                    {application?.status}

                    {!(application?.status === "accepted") && (
                      <Check
                        className="m-1 text-green-600 font-bold cursor-pointer"
                        onClick={() =>
                          statusHandler("accepted", application?._id)
                        }
                      />
                    )}

                    {!(application?.status === "rejected") && (
                      <X
                        className="m-1 text-red-600 font-bold cursor-pointer"
                        onClick={() =>
                          statusHandler("rejected", application?._id)
                        }
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Applications;
