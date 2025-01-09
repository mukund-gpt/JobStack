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
import { PencilLine } from "lucide-react";
import { setSingleCompany } from "@/redux/companySlice";
import { useNavigate } from "react-router-dom";

const CompaniesTable = ({ searchInput }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allCompanies } = useSelector((store) => store.company);
  const [filterCompanies, setFilterCompanies] = useState(allCompanies);

  useEffect(() => {
    const filteredCompanies =
      allCompanies?.filter((company) => {
        if (!searchInput) return true;
        return company?.companyName
          ?.toLowerCase()
          .includes(searchInput.toLowerCase());
      }) || [];
    setFilterCompanies(filteredCompanies);
  }, [allCompanies, searchInput]);

  const editHandler = (company) => {
    dispatch(setSingleCompany(company));
    navigate(`/admin/companies/edit/${company?._id}`);
  };
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
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterCompanies?.map((company) => (
              <TableRow key={company?._id}>
                <TableCell>
                  <div className="avatar w-10 h-10">
                    <img src={company?.logo} alt="Logo" />
                  </div>
                </TableCell>
                <TableCell>{company?.companyName}</TableCell>
                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right flex justify-end items-center">
                  <PencilLine
                    className="text-gray-500 cursor-pointer"
                    onClick={() => editHandler(company)}
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

export default CompaniesTable;
