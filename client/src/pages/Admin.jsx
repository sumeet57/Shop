import React from "react";
import { UserContext } from "../Context/User.context.jsx";
import Layout from "./admin/Layout.jsx";
import { Outlet, useLocation } from "react-router-dom";

const Admin = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/admin" || location.pathname === "/admin/" ? (
        <Layout />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Admin;
