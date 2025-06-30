const express = require("express");
const router = express.Router();
const {
  crearPostulacion,
  getPostulacionesEstudiante,
  getPostulacionesAdmin,
  getPostulacionesOrganizacion,
} = require("../controller/postulacionController");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

router.post("/", auth, crearPostulacion);
router.get("/mis-postulaciones", auth, getPostulacionesEstudiante);
router.get("/admin", auth, isAdmin, getPostulacionesAdmin);
router.get("/organizacion", auth, getPostulacionesOrganizacion);

module.exports = router;
