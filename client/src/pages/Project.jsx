import React from "react";
import { UserContext } from "../Context/User.context.jsx";
import { Outlet } from "react-router-dom";
import Layout from "./admin/Layout.jsx";
import Cart from "./dashboard/Cart.jsx";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const { user, loading } = React.useContext(UserContext);
  const location = useLocation();

  return <>{location.pathname === "/shop/dashboard" ? <Cart /> : <Outlet />}</>;
};

export default Dashboard;
