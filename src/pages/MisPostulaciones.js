import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";
import { UserContext } from "../context/UserContext";

const MisPostulaciones = () => {
  const { user } = useContext(UserContext);
  const [postulaciones, setPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedPostulacion, setSelectedPostulacion] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [editPresentacion, setEditPresentacion] = useState("");

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchMisPostulaciones = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/postulaciones/mis-postulaciones");
      setPostulaciones(res.data);
    } catch (error) {
      console.error("Error cargando postulaciones:", error);
    }
    setLoading(false);
  };

  // Eliminar
  const handleDelete = (postulacion) => {
    setSelectedPostulacion(postulacion);
    setOpenConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/postulaciones/${selectedPostulacion._id}`);
      fetchMisPostulaciones();
      setSnackbar({ open: true, message: "Postulación eliminada exitosamente", severity: "success" });
    } catch (error) {
      console.error("Error eliminando postulacion:", error);
      setSnackbar({ open: true, message: "Error al eliminar postulación", severity: "error" });
    }
    setOpenConfirm(false);
  };

  // Editar
  const handleEdit = (postulacion) => {
    setSelectedPostulacion(postulacion);
    setEditPresentacion(postulacion.presentacion);
    setOpenEdit(true);
  };

  const confirmEdit = async () => {
    try {
      await axiosInstance.put(`/postulaciones/${selectedPostulacion._id}`, {
        presentacion: editPresentacion,
      });
      fetchMisPostulaciones();
      setSnackbar({ open: true, message: "Presentación actualizada exitosamente", severity: "success" });
    } catch (error) {
      console.error("Error actualizando presentacion:", error);
      setSnackbar({ open: true, message: "Error al actualizar presentación", severity: "error" });
    }
    setOpenEdit(false);
  };

  useEffect(() => {
    fetchMisPostulaciones();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={3}>
        Mis Postulaciones
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : postulaciones.length === 0 ? (
        <Typography>No tienes postulaciones.</Typography>
      ) : (
        postulaciones.map((p) => (
          <Box
            key={p._id}
            border="1px solid #ccc"
            borderRadius={2}
            p={2}
            mb={2}
          >
            <Typography variant="h6">{p.propuesta?.titulo || "N/A"}</Typography>
            <Typography color="text.secondary">
              Organización: {p.propuesta?.organizacion?.usuario || "N/A"}
            </Typography>
            <Typography mt={1}>
              Presentación: {p.presentacion}
            </Typography>
            <Typography mt={1} fontSize="0.9rem" color="text.secondary">
              Fecha: {new Date(p.fecha).toLocaleDateString()}
            </Typography>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 1 }}
                onClick={() => handleEdit(p)}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(p)}
              >
                Eliminar
              </Button>
            </Box>
          </Box>
        ))
      )}

      {/* Modal Confirmación Eliminar */}
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres eliminar esta postulación? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Editar */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      >
        <DialogTitle>Editar presentación</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={editPresentacion}
            onChange={(e) => setEditPresentacion(e.target.value)}
            label="Presentación"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancelar</Button>
          <Button onClick={confirmEdit} color="primary" variant="contained">
            Guardar cambios
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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

export default MisPostulaciones;
