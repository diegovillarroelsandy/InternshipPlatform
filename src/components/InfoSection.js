import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";

export default function InfoSection() {
  return (
    <Box
      sx={{
        py: 8,
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4ecf5 100%)",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={4}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              mb: 2,
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                display: "block",
                width: "60%",
                height: "3px",
                backgroundColor: "#1976d2",
                margin: "8px auto 0",
                borderRadius: 2,
              },
            }}
          >
            ¿Qué es esta plataforma?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: "1.1rem",
              lineHeight: 1.7,
            }}
          >
            Esta es una plataforma moderna diseñada para conectar ideas con
            soluciones. Aquí puedes conocer nuestras propuestas, participar en
            iniciativas y obtener información relevante de forma clara, directa
            y visual.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
