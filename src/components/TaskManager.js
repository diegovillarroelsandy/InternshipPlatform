import React from "react";
import {
  Box,
  Card,
  Typography,
  IconButton,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Delete as DeleteIcon,
  KeyboardArrowDown,
  CheckCircle,
  RadioButtonUnchecked,
} from "@mui/icons-material";

const TaskItem = ({ title, description, progress, completed }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        mb: 2,
        borderRadius: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        position: "relative",
      }}
    >
      {/* Lado Izquierdo: Progreso o Checkbox */}
      <Box sx={{ position: "relative", display: "inline-flex", mr: 2 }}>
        {progress !== undefined ? (
          <>
            <CircularProgress
              variant="determinate"
              value={progress}
              size={55}
              thickness={5}
              sx={{ color: "#ffb133" }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.primary"
                sx={{ fontWeight: "bold" }}
              >
                {`${progress}%`}
              </Typography>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              color: completed ? "#ffb133" : "#e0e0e0",
              display: "flex",
              alignItems: "center",
            }}
          >
            {completed ? (
              <CheckCircle fontSize="large" />
            ) : (
              <RadioButtonUnchecked fontSize="large" />
            )}
          </Box>
        )}
      </Box>

      {/* Contenido Central */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: completed ? "#999" : "#333" }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="caption"
            sx={{ color: "#aaa", display: "block", lineHeight: 1.2 }}
          >
            {description}
          </Typography>
        )}
      </Box>

      {/* Botones de Acción */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <IconButton size="small" sx={{ color: "#ccc" }}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        {progress !== undefined && (
          <IconButton
            size="small"
            sx={{
              bgcolor: "#ffb133",
              color: "white",
              "&:hover": { bgcolor: "#e69f2d" },
            }}
          >
            <KeyboardArrowDown fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Card>
  );
};

export default function TaskManager() {
  return (
    <Container
      maxWidth="xs"
      sx={{
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
        p: 0,
        borderRadius: "40px",
        overflow: "hidden",
      }}
    >
      {/* Header Naranja */}
      <Box sx={{ bgcolor: "#ffb133", p: 4, pt: 6, pb: 8, color: "white" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MenuIcon />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Task List
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "#ffb133",
              borderRadius: "20px",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#fcfcfc" },
            }}
          >
            + New
          </Button>
        </Box>
      </Box>

      {/* Lista de Tareas con margen negativo para subir las tarjetas */}
      <Box sx={{ px: 2, mt: -4 }}>
        <TaskItem
          title="Add Your Task List"
          description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy."
          progress={75}
        />
        <TaskItem
          title="Add Your Task List"
          description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
          progress={50}
        />

        <TaskItem title="Your Completed Task Name" completed={true} />
        <TaskItem title="Your Completed Task Name" completed={true} />
        <TaskItem title="Add Your Task Name" completed={false} />

        <TaskItem
          title="Add Your Task List"
          description="Sed diam nonummy nibh euismod tincidunt ut laoreet."
          progress={60}
        />
      </Box>
    </Container>
  );
}
