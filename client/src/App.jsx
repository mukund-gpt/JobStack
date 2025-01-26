import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./pages/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDetails from "./components/JobDetails";
import { useSelector } from "react-redux";
import Companies from "./components/admin/Companies";
import CreateCompanies from "./components/admin/CreateCompanies";
import EditCompany from "./components/admin/EditCompany";
import AdminJobs from "./components/admin/AdminJobs";
import CreateJob from "./components/admin/CreateJob";
import Applications from "./components/admin/Applications";
import ForgetPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";
import BookMarks from "./components/BookMarks";

const App = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/forget-password"
          element={!user ? <ForgetPassword /> : <Navigate to="/" />}
        />
        <Route
          path="/reset-password/:token"
          element={!user ? <ResetPassword /> : <Navigate to="/" />}
        />

        {/* Routes for Students Only */}
        {user?.role !== "recruiter" && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/details/:id" element={<JobDetails />} />
            <Route path="/browse" element={<Browse />} />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/bookmarks"
              element={user ? <BookMarks /> : <Navigate to="/" />}
            />
          </>
        )}

        {/* Admin Routes */}
        {user?.role === "recruiter" && (
          <>
            <Route path="/" element={<Companies />} />
            <Route path="/admin/companies" element={<Companies />} />
            <Route
              path="/admin/companies/create"
              element={<CreateCompanies />}
            />
            <Route path="/admin/companies/edit/:id" element={<EditCompany />} />
            <Route path="/admin/jobs" element={<AdminJobs />} />
            <Route path="/admin/jobs/create" element={<CreateJob />} />
            <Route
              path="/admin/jobs/:id/applications"
              element={<Applications />}
            />
          </>
        )}

        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </>
  );
};

export default App;
