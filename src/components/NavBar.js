import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Landing
          </Button>
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/propuestas">
          Propuestas
        </Button>
        <Button color="inherit" component={Link} to="/info">
          Más Información
        </Button>
        <Button color="inherit" component={Link} to="/login" variant="outlined">
          Iniciar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
}
