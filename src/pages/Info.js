import React from "react";
import { Container, Typography } from "@mui/material";

export default function Info() {
  return (
    <Container>
      <Typography variant="h4" mt={5}>
        Más Información
      </Typography>
      <Typography mt={2}>Aquí puedes conocer más sobre nosotros.</Typography>
    </Container>
  );
}
