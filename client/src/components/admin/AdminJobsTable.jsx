import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { PencilLine, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = ({ searchInput }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { adminJobs } = useSelector((store) => store.job);
  const [filterAdminJobs, setFilterAdminJobs] = useState(adminJobs);

  useEffect(() => {
    const filteredAdminJobs =
      adminJobs?.filter((job) => {
        if (!searchInput) return true;
        return (
          job?.company?.companyName
            ?.toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          job?.title?.toLowerCase().includes(searchInput.toLowerCase())
        );
      }) || [];

    setFilterAdminJobs(filteredAdminJobs);
  }, [adminJobs, searchInput]);

  return (
    <>
      <div className="w-full min-w-[350px] sm:w-3/4 mx-auto p-2 m-2">
        <Table>
          <TableCaption className="caption-top">
            List of your created jobs
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterAdminJobs?.map((job) => (
              <TableRow key={job?._id}>
                <TableCell>
                  <div className="avatar w-10 h-10">
                    <img src={job?.company?.logo} alt="Logo" />
                  </div>
                </TableCell>
                <TableCell>{job?.company?.companyName}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right flex justify-end items-center">
                  {/* <PencilLine className="text-gray-500 cursor-pointer mx-2" /> */}
                  <Users
                    className="text-gray-500 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/jobs/${job?._id}/applications`)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default AdminJobsTable;
