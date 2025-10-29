import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import userApi, { authApi } from "../interceptors/auth.api.js";

const ProtectedRoute = ({ allowedRoles, redirectPath = "/auth" }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authApi.get("/me");
        if (res) {
          const { data } = res;
          setUser(data);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <div>Loading user authentication...</div>;
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
