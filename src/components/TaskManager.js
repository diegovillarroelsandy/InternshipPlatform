import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  IconButton,
  Button,
  Container,
  CircularProgress,
  TextField,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Delete as DeleteIcon,
  KeyboardArrowDown,
  CheckCircle,
  RadioButtonUnchecked,
} from "@mui/icons-material";

const TaskManager = () => {
  // 1. ESTADO: Lista inicial de tareas
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Add Your Task List",
      desc: "Lorem ipsum dolor sit amet...",
      progress: 75,
    },
    { id: 2, title: "Your Completed Task Name", completed: true },
  ]);

  // 2. FUNCIÓN: Añadir tarea (usamos un prompt simple para el ejemplo)
  const addTask = () => {
    const title = prompt("Nombre de la nueva tarea:");
    if (title) {
      const newTask = {
        id: Date.now(), // ID único basado en el tiempo
        title: title,
        progress: 0, // Nueva tarea empieza en 0%
      };
      setTasks([newTask, ...tasks]); // Añadimos al inicio
    }
  };

  // 3. FUNCIÓN: Eliminar tarea
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        bgcolor: "#f5f5f5",
        p: 0,
        borderRadius: "40px",
        overflow: "hidden",
        minHeight: "80vh",
        boxShadow: 10,
      }}
    >
      {/* Header */}
      <Box sx={{ bgcolor: "#ffb133", p: 4, pb: 8, color: "white" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MenuIcon />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Task List
          </Typography>
          <Button
            onClick={addTask} // <-- Click para añadir
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "#ffb133",
              borderRadius: "20px",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#fff" },
            }}
          >
            + New
          </Button>
        </Box>
      </Box>

      {/* Lista de Tareas Dinámica */}
      <Box sx={{ px: 2, mt: -5 }}>
        {tasks.map((task) => (
          <Card
            key={task.id}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              mb: 2,
              borderRadius: "20px",
            }}
          >
            {/* Indicador de progreso o Check */}
            <Box sx={{ position: "relative", display: "inline-flex", mr: 2 }}>
              {task.progress !== undefined ? (
                <>
                  <CircularProgress
                    variant="determinate"
                    value={task.progress}
                    size={45}
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
                      sx={{ fontSize: "0.6rem", fontWeight: "bold" }}
                    >
                      {task.progress}%
                    </Typography>
                  </Box>
                </>
              ) : (
                <Box sx={{ color: task.completed ? "#ffb133" : "#e0e0e0" }}>
                  {task.completed ? (
                    <CheckCircle fontSize="large" />
                  ) : (
                    <RadioButtonUnchecked fontSize="large" />
                  )}
                </Box>
              )}
            </Box>

            {/* Texto de la tarea */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "bold",
                  color: task.completed ? "#999" : "#333",
                }}
              >
                {task.title}
              </Typography>
              {task.desc && (
                <Typography
                  variant="caption"
                  sx={{ color: "#aaa", display: "block" }}
                >
                  {task.desc}
                </Typography>
              )}
            </Box>

            {/* Botón Eliminar */}
            <Box>
              <IconButton
                onClick={() => deleteTask(task.id)} // <-- Click para eliminar
                size="small"
                sx={{ color: "#d32f2f" }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Card>
        ))}

        {tasks.length === 0 && (
          <Typography sx={{ textAlign: "center", mt: 10, color: "#aaa" }}>
            No hay tareas pendientes.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default TaskManager;
