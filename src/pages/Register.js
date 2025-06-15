// src/pages/Register.js
import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("estudiante");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("/api/users", {
        usuario,
        correo,
        contrasena,
        rol,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" mt={5}>
        Registrarse
      </Typography>
      <TextField
        fullWidth
        label="Nombre de usuario"
        margin="normal"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <TextField
        fullWidth
        label="Correo"
        margin="normal"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <TextField
        fullWidth
        label="Contraseña"
        type="password"
        margin="normal"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleRegister}
      >
        Crear Cuenta
      </Button>
    </Container>
  );
}
