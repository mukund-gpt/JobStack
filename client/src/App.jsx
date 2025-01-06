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

const App = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <Routes>
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/details/:id" element={<JobDetails />} />
        <Route path="/browse" element={<Browse />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
};

export default App;
