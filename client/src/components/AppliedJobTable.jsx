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

const AppliedJobTable = () => {
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
              {[1, 3, 4, 6, 7, 8].map((item, index) => (
                <TableRow key={index} className="">
                  <TableCell>17-07-2024</TableCell>
                  <TableCell>Frontend developer</TableCell>
                  <TableCell>Google</TableCell>
                  <TableCell className="text-right ">
                    <div className="badge bg-white text-red-500 font-bold border-gray-300 p-3">
                      pending
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
