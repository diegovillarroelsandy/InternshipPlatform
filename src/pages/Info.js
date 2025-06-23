import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  Fade
} from "@mui/material";
export default function Info() {
  return (
<Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Fade in={true} timeout={800}>
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              fontFamily: "'Roboto Slab', serif",
              color: "primary.main",
              textShadow: "2px 2px 4px rgba(0,0,0,0.15)",
            }}
            gutterBottom
          >
            Pasantías Universitarias
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontStyle: "italic", letterSpacing: 1.2 }}
          >
            Un puente entre la academia y la experiencia profesional
          </Typography>
        </Box>
      </Fade>

      <Divider sx={{ mb: 5, borderColor: "primary.light" }} />

      <Grid container spacing={4}>
        {[
          {
            title: "¿Qué son las pasantías?",
            content:
              "Las pasantías son experiencias laborales supervisadas que permiten a los estudiantes aplicar sus conocimientos en entornos profesionales reales y desarrollar habilidades prácticas valiosas.",
          },
          {
            title: "¿Quiénes pueden postular?",
            content:
              "Estudiantes que hayan completado al menos el 50% de su plan curricular y cuenten con la autorización de su facultad o carrera.",
          },
          {
            title: "Duración y modalidad",
            content:
              "Las pasantías pueden durar entre 2 y 6 meses y realizarse en modalidad presencial, híbrida o remota según la empresa receptora.",
          },
          {
            title: "Procedimiento de la plataforma",
            content:
              "La organizacion postea su propuesta solicitando pasantes, el rector aprueba o rechaza la propuesta y se muestra en la pagina para que el estudiante pueda postular",
          },
        ].map(({ title, content }, index) => (
          <Grid item xs={12} sm={6} key={title}>
            <Fade in={true} style={{ transitionDelay: `${index * 300}ms` }}>
              <Card
                sx={{
                  height: "100%",
                  boxShadow: 5,
                  borderRadius: 3,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 10,
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: "600",
                      fontFamily: "'Roboto', sans-serif",
                      color: "secondary.main",
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {content}
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      <Box mt={8} textAlign="center">
        <Fade in={true} timeout={1200}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "medium",
              color: "primary.dark",
              letterSpacing: 1,
              fontFamily: "'Roboto Slab', serif",
            }}
          >
            Para más información, contacta a la Oficina de Pasantías en tu
            facultad o escribe a{" "}
            <Box component="span" color="secondary.main" fontWeight="bold">
              pasantias@universidad.edu
            </Box>
          </Typography>
        </Fade>
      </Box>
    </Container>
  );
}
