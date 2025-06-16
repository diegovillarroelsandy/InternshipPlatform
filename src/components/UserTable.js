import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Stack,
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";
import { Snackbar, Alert } from "@mui/material";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    usuario: "",
    correo: "",
    password: "",
    rol: "estudiante",
  });
  const [errors, setErrors] = useState({
    usuario: "",
    correo: "",
    password: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // 'success', 'error', 'warning', 'info'
  });
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error(
        "Error cargando usuarios:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Error cargando usuarios");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const validateForm = () => {
    const newErrors = { usuario: "", correo: "", password: "" };
    let isValid = true;

    if (!form.usuario || form.usuario.length > 8) {
      newErrors.usuario = "Debe tener máximo 8 caracteres";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.correo || !emailRegex.test(form.correo)) {
      newErrors.correo = "Correo no válido";
      isValid = false;
    }

    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    console.log("Enviando datos:", form);
    try {
      const res = await axiosInstance.post("/users", form);
      showSnackbar(res.data.message);
      fetchUsers();
      setForm({ usuario: "", correo: "", password: "", rol: "estudiante" });
      setErrors({ usuario: "", correo: "", password: "" }); // limpiar errores
    } catch (error) {
      console.error("Error creando usuario:", error);
      showSnackbar(error.response?.data?.message || "Error creando usuario");
    }
  };
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      console.error(error);
      showSnackbar("Error eliminando usuario");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" mb={3}>
        Usuarios
      </Typography>

      <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
        <TextField
          label="Usuario(Max. 8 caracteres)"
          value={form.usuario}
          onChange={(e) => setForm({ ...form, usuario: e.target.value })}
          sx={{ minWidth: 200 }}
          error={!!errors.usuario}
          helperText={errors.usuario}
        />

        <TextField
          label="Correo"
          value={form.correo}
          onChange={(e) => setForm({ ...form, correo: e.target.value })}
          sx={{ minWidth: 200 }}
          error={!!errors.correo}
          helperText={errors.correo}
        />

        <TextField
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          sx={{ minWidth: 200 }}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Select
          value={form.rol}
          onChange={(e) => setForm({ ...form, rol: e.target.value })}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="estudiante">Estudiante</MenuItem>
          <MenuItem value="organizacion">Organización</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Crear
        </Button>
      </Stack>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u._id}>
              <TableCell>{u.usuario}</TableCell>
              <TableCell>{u.correo}</TableCell>
              <TableCell>{u.rol}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(u._id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserTable;
