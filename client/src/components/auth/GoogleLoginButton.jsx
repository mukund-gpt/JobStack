import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "@/redux/authSlice";
import { baseUrl } from "@/utils/baseUrl";

const GoogleLoginButton = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  const handleSuccess = async (response) => {
    if (!role) {
      toast.error("Please select a role to continue");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/auth/google-auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ google_token: response.credential, role }),
      });

      const data = await res.json();
      console.log("Server Response:", data);

      if (data.success) {
        dispatch(setUser(data.user));
        toast.success(`${data.message}`);
        navigate("/");
      } else {
        toast.error(`Registration failed: ${data.message}`);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
    toast.error("Google login failed. Please try again.");
  };

  return (
    <div className="p-2">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default GoogleLoginButton;
