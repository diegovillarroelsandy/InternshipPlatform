import React from "react";
import { Container, Typography } from "@mui/material";

export default function Propuestas() {
  return (
    <Container>
      <Typography variant="h4" mt={5}>
        Nuestras Propuestas
      </Typography>
      <Typography mt={2}>Aquí detallamos lo que ofrecemos.</Typography>
    </Container>
  );
}
