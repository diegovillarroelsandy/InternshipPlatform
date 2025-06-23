import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";

const PropuestasAdmin = () => {
  const [propuestas, setPropuestas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

const fetchPendientes = async () => {
  setLoading(true);
  try {
    const res = await axiosInstance.get("/propuestas");
    setPropuestas(res.data); // Muestra todas las propuestas sin filtrar
  } catch (err) {
    console.error("Error cargando propuestas:", err);
  }
  setLoading(false);
};

  const actualizarEstado = async (id, nuevoValor) => {
    try {
      const res = await axiosInstance.put(`/propuestas/${id}/aprobar`, {
        aprobada: nuevoValor,
      });
      setSnackbar({
        open: true,
        message: res.data.message || "Estado actualizado",
        severity: "success",
      });
      fetchPendientes();
    } catch (err) {
      console.error("Error actualizando estado:", err);
      setSnackbar({
        open: true,
        message: "Error actualizando estado",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchPendientes();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={3}>
        Propuestas Pendientes
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : propuestas.length === 0 ? (
        <Typography>No hay propuestas pendientes</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Carrera</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Organización</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {propuestas.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.titulo}</TableCell>
                <TableCell>{p.carrera}</TableCell>
                <TableCell>{p.descripcion}</TableCell>
                <TableCell>{p.organizacion?.usuario || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    variant={p.aprobada ? "contained" : "outlined"}
                    color="success"
                    onClick={() => actualizarEstado(p._id, true)}
                    sx={{ mr: 1 }}
                  >
                    Aprobar
                  </Button>
                  <Button
                    variant={!p.aprobada ? "contained" : "outlined"}
                    color="error"
                    onClick={() => actualizarEstado(p._id, false)}
                  >
                    Rechazar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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

export default PropuestasAdmin;
