import { Container, Typography, TextField, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { setUser } from "../utils/auth";
export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        correo,
        contrasena,
      });
      setUser({ ...res.data.user, token: res.data.token });
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Correo o contraseña incorrectos");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" mt={5}>
        Iniciar Sesión
      </Typography>
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
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Entrar
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleRegister}
        >
          Registrarse
        </Button>
      </Stack>
    </Container>
  );
}
