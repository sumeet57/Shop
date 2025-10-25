import React from "react";
import { UserContext } from "../Context/User.context.jsx";
import { Outlet } from "react-router-dom";
import Layout from "./admin/Layout.jsx";
import Cart from "./project/Cart.jsx";
import { useLocation } from "react-router-dom";
import Header from "../components/Shop/Header.jsx";
import Footer from "../components/Footer.jsx";

const Project = () => {
  const { user, loading } = React.useContext(UserContext);
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="project">
        {location.pathname === "/project" ? <Cart /> : <Outlet />}
      </div>
      <Footer />
    </>
  );
};

export default Project;
