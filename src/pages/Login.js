import React from "react";
import { Container, Typography, TextField, Button } from "@mui/material";

export default function Login() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" mt={5}>
        Iniciar Sesión
      </Typography>
      <TextField fullWidth label="Correo" margin="normal" />
      <TextField fullWidth label="Contraseña" type="password" margin="normal" />
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Entrar
      </Button>
    </Container>
  );
}
