import React from "react";
import { UserContext } from "../Context/User.context.jsx";
import Layout from "./admin/Layout.jsx";
import Header from "../components/Shop/Header.jsx";
import { Outlet, useLocation } from "react-router-dom";

const Admin = () => {
  const { user, loading } = React.useContext(UserContext);
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
