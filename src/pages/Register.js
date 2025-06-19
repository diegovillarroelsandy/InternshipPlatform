import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  AlertTitle,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function Register() {
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("estudiante");
  const [errors, setErrors] = useState({});

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
    showLoginButton: false,
  });

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (usuario.length > 8) newErrors.usuario = "Máximo 8 caracteres";
    if (!/\S+@\S+\.\S+/.test(correo)) newErrors.correo = "Correo inválido";
    if (!password) newErrors.password = "Contraseña requerida";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSnackbar({
        open: true,
        message: "Completa correctamente los campos",
        severity: "error",
        showLoginButton: false,
      });
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      await axiosInstance.post("/auth/register", {
        usuario,
        correo,
        password,
        rol,
      });

      setSnackbar({
        open: true,
        message: "Registro exitoso",
        severity: "success",
        showLoginButton: true,
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || "Error al registrar",
        severity: "error",
        showLoginButton: false,
      });
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
        error={!!errors.usuario}
        helperText={errors.usuario}
      />
      <TextField
        fullWidth
        label="Correo"
        margin="normal"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        error={!!errors.correo}
        helperText={errors.correo}
      />
      <TextField
        fullWidth
        label="Contraseña"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Rol</InputLabel>
        <Select
          value={rol}
          label="Rol"
          onChange={(e) => setRol(e.target.value)}
        >
          <MenuItem value="estudiante">Estudiante</MenuItem>
          <MenuItem value="organizacion">Organización</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleRegister}
      >
        Crear Cuenta
      </Button>

      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          variant="filled"
          sx={{ width: "100%" }}
        >
          <Stack spacing={1}>
            <AlertTitle>
              {snackbar.severity === "success" ? "Éxito" : "Error"}
            </AlertTitle>
            {snackbar.message}
            {snackbar.showLoginButton && (
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={() => navigate("/login")}
              >
                Ir al login
              </Button>
            )}
          </Stack>
        </Alert>
      </Snackbar>
    </Container>
  );
}
