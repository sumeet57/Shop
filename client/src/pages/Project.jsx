import React from "react";
import { UserContext } from "../Context/User.context.jsx";
import { Outlet } from "react-router-dom";
import Cart from "./project/Cart.jsx";
import { useLocation } from "react-router-dom";

const Project = () => {
  const location = useLocation();

  return (
    <>
      <div className="project">
        {location.pathname === "/project" ? <Cart /> : <Outlet />}
      </div>
    </>
  );
};

export default Project;
