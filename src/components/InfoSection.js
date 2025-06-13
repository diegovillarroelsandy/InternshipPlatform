import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function InfoSection() {
  return (
    <Box sx={{ py: 6, backgroundColor: "#fff" }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom align="center">
          ¿Qué es esta plataforma?
        </Typography>
        <Typography variant="body1" align="center">
          Esta es una plataforma moderna diseñada para conectar ideas con
          soluciones. Aquí puedes conocer nuestras propuestas, participar en
          iniciativas y obtener información relevante de forma clara, directa y
          visual.
        </Typography>
      </Container>
    </Box>
  );
}
