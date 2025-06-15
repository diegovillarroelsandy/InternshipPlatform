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

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    usuario: "",
    correo: "",
    password: "",
    rol: "estudiante",
  });

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

  const handleCreate = async () => {
    console.log("Enviando datos:", form);
    try {
      const res = await axiosInstance.post("/users", form);
      alert(res.data.message); // mensaje del backend

      // Luego recarga la lista completa
      fetchUsers();

      setForm({ usuario: "", correo: "", password: "", rol: "estudiante" });
    } catch (error) {
      console.error("Error creando usuario:", error);
      alert(error.response?.data?.message || "Error creando usuario");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      console.error(error);
      alert("Error eliminando usuario");
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
          label="Usuario"
          value={form.usuario}
          onChange={(e) => setForm({ ...form, usuario: e.target.value })}
          sx={{ minWidth: 200 }}
        />
        <TextField
          label="Correo"
          value={form.correo}
          onChange={(e) => setForm({ ...form, correo: e.target.value })}
          sx={{ minWidth: 200 }}
        />
        <TextField
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          sx={{ minWidth: 200 }}
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
    </Box>
  );
};

export default UserTable;
