import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const CompaniesTable = () => {
  return (
    <>
      <div className="w-full sm:w-3/4 mx-auto p-2 m-2">
        <Table>
          <TableCaption className="caption-top">
            List of your registered companies
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>
                <div className="avatar w-10 h-10">
                  <img
                    src="https://res.cloudinary.com/dk7sjwqoi/image/upload/v1736243183/JobStack/sltywbeb8jli65tob2i0.png"
                    alt="Logo"
                  />
                </div>
              </TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>21-12-1222</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <div className="avatar w-10 h-10">
                  <img
                    src="https://res.cloudinary.com/dk7sjwqoi/image/upload/v1736243183/JobStack/sltywbeb8jli65tob2i0.png"
                    alt="Logo"
                  />
                </div>
              </TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>21-12-1222</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CompaniesTable;
