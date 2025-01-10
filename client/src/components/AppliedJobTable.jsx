import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const AppliedJobTable = () => {
  const { appliedJobs, loading } = useGetAppliedJobs();
  // console.log(appliedJobs);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[40vh]">
        <div className="loading loading-spinner loading-lg text-purple-400"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-[90vw] sm:w-[80vw] mx-auto my-5 shadow-md rounded-md shadow-amber-300">
        <div className="m-2 p-2 ">
          <Table>
            <TableCaption className="text-2xl font-bold text-violet-500 m-2 caption-top">
              Applied Jobs
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role </TableHead>
                <TableHead>Company </TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {appliedJobs?.map((item, index) => (
                <TableRow key={index} className="">
                  <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell>{item?.jobId?.title}</TableCell>
                  <TableCell>{item?.jobId?.company?.companyName}</TableCell>
                  <TableCell className="text-right ">
                    <div
                      className={`badge bg-white font-bold border-gray-300 p-3 ${
                        item?.status === "accepted"
                          ? "text-green-500"
                          : item?.status === "rejected"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {item?.status}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobTable;
