import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
  CircularProgress,
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  MenuItem,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";
const Propuestas = () => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [propuestas, setPropuestas] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    carrera: "",
    descripcion: "",
  });
  const isOrganizacion = user?.rol === "organizacion";
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [selectedPropuesta, setSelectedPropuesta] = useState(null);
  const [presentacion, setPresentacion] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({ titulo: "", carrera: "", descripcion: "" });
  };

  const fetchPropuestas = async () => {
    try {
      const res = await axiosInstance.get("/propuestas/aprobadas"); // ✅ usar ruta correcta
      setPropuestas(res.data); // ✅ sin .json()
    } catch (error) {
      console.error("Error cargando propuestas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post("/propuestas", form);
      fetchPropuestas();
      handleClose();
    } catch (error) {
      console.error("Error al enviar propuesta:", error);
      alert(error.response?.data?.message || "Error al enviar propuesta");
    }
  };

  useEffect(() => {
    fetchPropuestas();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  const handleOpenModal = (propuesta) => {
    setSelectedPropuesta(propuesta);
    setPresentacion("");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPropuesta(null);
  };

  const handlePostular = async () => {
    if (!presentacion.trim()) {
      setSnackbar({
        open: true,
        message: "Debes escribir una presentación",
        severity: "error",
      });
      return;
    }

    try {
      await axiosInstance.post("/postulaciones", {
        propuestaId: selectedPropuesta._id,
        presentacion,
      });
      setSnackbar({
        open: true,
        message: "¡Postulación enviada exitosamente!",
        severity: "success",
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error al postular:", error);
      setSnackbar({
        open: true,
        message: "Error al enviar la postulación",
        severity: "error",
      });
    }
  };
  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Propuestas
      </Typography>

      {isOrganizacion && (
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Postear Propuesta
        </Button>
      )}

      {/* Lista de propuestas */}
      <Box mt={3}>
        {propuestas.map((p) => (
          <Box key={p._id} borderBottom="1px solid #ccc" mb={2} pb={1}>
            <Typography variant="h6">{p.titulo}</Typography>
            <Typography color="text.secondary">{p.carrera}</Typography>
            <Typography>{p.descripcion}</Typography>
            {user?.rol === "estudiante" && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenModal(p)}
              >
                Postular
              </Button>
            )}
          </Box>
        ))}
      </Box>
      {/* Modal de postulación */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedPropuesta && (
            <>
              <Typography variant="h6" mb={1}>
                {selectedPropuesta.titulo}
              </Typography>
              <Typography color="text.secondary" mb={1}>
                {selectedPropuesta.carrera}
              </Typography>
              <Typography mb={2}>{selectedPropuesta.descripcion}</Typography>

              <TextField
                label="Presentación"
                multiline
                rows={4}
                fullWidth
                value={presentacion}
                onChange={(e) => setPresentacion(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePostular}
              >
                Enviar Postulación
              </Button>
            </>
          )}
        </Box>
      </Modal>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            mx: "auto",
            mt: "10%",
          }}
        >
          <Typography variant="h6" mb={2}>
            Nueva Propuesta
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Título"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              fullWidth
            />
            <TextField
              label="Carrera"
              value={form.carrera}
              onChange={(e) => setForm({ ...form, carrera: e.target.value })}
              fullWidth
              select
            >
              <MenuItem value="Ingeniería">Ingeniería</MenuItem>
              <MenuItem value="Derecho">Derecho</MenuItem>
              <MenuItem value="Medicina">Medicina</MenuItem>
              <MenuItem value="Arquitectura">Arquitectura</MenuItem>
            </TextField>
            <TextField
              label="Descripción"
              multiline
              rows={4}
              value={form.descripcion}
              onChange={(e) =>
                setForm({ ...form, descripcion: e.target.value })
              }
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Publicar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default Propuestas;
