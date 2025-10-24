import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const DashboardProduct = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  return (
    <>
      <h1>{params?.id}</h1>
    </>
  );
};

export default DashboardProduct;
