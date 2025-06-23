import { useContext, useEffect,useState } from "react";
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
          </Box>
        ))}
      </Box>

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
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
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


