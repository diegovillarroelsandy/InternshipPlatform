import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";

const PostulacionesAdmin = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPostulaciones = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/postulaciones/admin");
      setPostulaciones(res.data);
    } catch (err) {
      console.error("Error cargando postulaciones:", err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta postulación?")) return;
    try {
      await axiosInstance.delete(`/postulaciones/${id}`);
      fetchPostulaciones();
    } catch (err) {
      console.error("Error eliminando postulación:", err);
    }
  };

  useEffect(() => {
    fetchPostulaciones();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h5" mb={3}>
        Todas las Postulaciones
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : postulaciones.length === 0 ? (
        <Typography>No hay postulaciones</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Propuesta</TableCell>
              <TableCell>Estudiante</TableCell>
              <TableCell>Organización</TableCell>
              <TableCell>Presentación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postulaciones.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.propuesta?.titulo || "N/A"}</TableCell>
                <TableCell>{p.estudiante?.usuario || "N/A"}</TableCell>
                <TableCell>{p.propuesta?.organizacion?.usuario || "N/A"}</TableCell>
                <TableCell>{p.presentacion}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => handleDelete(p._id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default PostulacionesAdmin;
