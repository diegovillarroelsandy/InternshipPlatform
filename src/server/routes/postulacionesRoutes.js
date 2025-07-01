const express = require("express");
const router = express.Router();
const {
  crearPostulacion,
  getPostulacionesEstudiante,
  getPostulacionesAdmin,
  getPostulacionesOrganizacion,
  deletePostulacion,
  updatePostulacion
} = require("../controller/postulacionController");
const { auth, isAdmin } = require("../middleware/authMiddleware");


router.post("/", auth, crearPostulacion);
router.get("/mis-postulaciones", auth, getPostulacionesEstudiante);
router.get("/admin", auth, isAdmin, getPostulacionesAdmin);
router.get("/organizacion", auth, getPostulacionesOrganizacion);
router.delete("/:id", auth, deletePostulacion);
router.put("/:id", auth, updatePostulacion);
module.exports = router;
