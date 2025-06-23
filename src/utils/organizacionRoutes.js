import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "./auth";

const OrganizacionRoute = ({ children }) => {
  const user = getUser();

  if (!user || user.rol !== "organizacion") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default OrganizacionRoute;