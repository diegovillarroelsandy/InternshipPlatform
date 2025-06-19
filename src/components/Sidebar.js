import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const Sidebar = ({ selectedView, setSelectedView }) => {
  const items = [
    { label: "Usuarios", value: "usuarios", icon: <PeopleIcon /> },
    { label: "Propuestas", value: "propuestas", icon: <WorkIcon /> },
    {
      label: "Postulaciones",
      value: "postulaciones",
      icon: <AssignmentIndIcon />,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
          borderRight: "1px solid #ddd",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Admin
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List>
          {items.map((item) => (
            <ListItem key={item.value} disablePadding>
              <ListItemButton
                selected={selectedView === item.value}
                onClick={() => setSelectedView(item.value)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
