import React from "react";
import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container>
      <Typography variant="h3" mt={5}>
        Bienvenido a la plataforma
      </Typography>
      <Typography mt={2}>Explora nuestras funcionalidades.</Typography>
    </Container>
  );
}
