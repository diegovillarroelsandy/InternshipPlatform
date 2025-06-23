const express = require("express");
const router = express.Router();
const {
  crearPropuesta,
  obtenerPropuestas,
  obtenerMisPropuestas,
  getAllPropuestas,
  getPropuestasAprobadas,
  actualizarAprobacion
} = require("../controller/propuestaController");
const { auth, isAdmin } = require("../middleware/authMiddleware");
router.get("/", obtenerPropuestas); // público
router.get("/mis-propuestas", auth, obtenerMisPropuestas); // solo organización autenticada
router.post("/", auth, crearPropuesta); // crear (solo organización autenticada)
router.get("/", auth, isAdmin, async (req, res) => {
  const propuestas = await Propuesta.find().populate("organizacion", "usuario");
  res.json(propuestas);
});
router.put("/:id/aprobar", auth, isAdmin, actualizarAprobacion);

router.get("/", auth, isAdmin, getAllPropuestas);
router.get("/aprobadas", getPropuestasAprobadas);

module.exports = router;