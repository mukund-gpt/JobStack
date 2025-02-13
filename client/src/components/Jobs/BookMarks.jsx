import React from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useNavigate } from "react-router-dom";

const BookMarks = () => {
  const navigate = useNavigate();
  const { bookmarks } = useSelector((store) => store.auth);
  // console.log(bookmarks);

  return (
    <div className="m-1 p-1 mt-5 sm:m-2 sm:p-2 md:m-4 md:p-4 shadow-md shadow-purple-600">
      <Table>
        <TableCaption className="m-2 sm:m-5 caption-top text-[30px] font-bold text-green-500">
          Bookmarks
        </TableCaption>

        {bookmarks?.length === 0 ? (
          <div className="text-center text-lg m-10">No bookmarks available</div>
        ) : (
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
        )}

        <TableBody>
          {bookmarks?.map((job) => (
            <TableRow
              key={job?._id}
              className="cursor-pointer"
              onClick={() => navigate(`/jobs/details/${job?._id}`)}
            >
              <TableCell>
                <div className="avatar w-10 h-10">
                  <img src={job?.company?.logo} alt="Logo" />
                </div>
              </TableCell>
              <TableCell>{job?.company?.companyName}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookMarks;
