import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getUser, isAdmin, logout } from "../utils/auth";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";

export default function Navbar() {
  const user = getUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/login");
  };

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

        {user && isAdmin(user) && (
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
        )}

        {user ? (
          <>
            <IconButton
              color="inherit"
              onClick={handleMenu}
              size="large"
              edge="end"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>{user.usuario}</MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            color="inherit"
            component={Link}
            to="/login"
            variant="outlined"
          >
            Iniciar Sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
