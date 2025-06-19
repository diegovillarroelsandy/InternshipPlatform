import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import UserTable from "../components/UserTable";
import PropuestasAdmin from "../components/PropuestasAdmin";
import PostulacionesAdmin from "../components/PostulacionesAdmin";

const Dashboard = () => {
  const [selectedView, setSelectedView] = useState("usuarios");

  const renderView = () => {
    switch (selectedView) {
      case "usuarios":
        return <UserTable />;
      case "propuestas":
        return <PropuestasAdmin />;
      case "postulaciones":
        return <PostulacionesAdmin />;
      default:
        return <UserTable />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar setSelectedView={setSelectedView} />
      <Box sx={{ flexGrow: 1, p: 3 }}>{renderView()}</Box>
    </Box>
  );
};

export default Dashboard;
