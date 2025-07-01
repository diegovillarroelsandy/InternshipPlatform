import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Stack,
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";
import { UserContext } from "../context/UserContext";

const PostulacionesOrganizacion = () => {
  const { user } = useContext(UserContext);
  const [postulaciones, setPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPostulaciones = async () => {
    try {
      const res = await axiosInstance.get("/postulaciones/organizacion");
      setPostulaciones(res.data);
    } catch (error) {
      console.error("Error cargando postulaciones:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPostulaciones();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        Postulaciones Recibidas
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : postulaciones.length === 0 ? (
        <Typography>No tienes postulaciones aún.</Typography>
      ) : (
        postulaciones.map((postulacion) => (
          <Paper key={postulacion._id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">
              Propuesta: {postulacion.propuesta?.titulo || "N/A"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Estudiante: {postulacion.estudiante?.usuario || "N/A"}
            </Typography>
            <Typography variant="body2" mt={1}>
              Presentación: {postulacion.presentacion}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Fecha: {new Date(postulacion.fecha).toLocaleDateString()}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default PostulacionesOrganizacion;
