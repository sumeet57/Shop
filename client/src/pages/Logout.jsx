import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogout = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.status === 200) {
        toast.success("Logged out successfully.");
        window.location.href = "/";
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="bg-zinc-800 rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Logout</h2>
        <p className="text-zinc-300 mb-6">Are you sure you want to logout?</p>
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
