const Propuesta = require("../models/Propuesta");
exports.crearPropuesta = async (req, res) => {
  try {
    const { titulo, carrera, descripcion } = req.body;

    // Verifica que sea una organización
    if (req.user.rol !== "organizacion") {
      return res.status(403).json({ message: "Solo las organizaciones pueden crear propuestas." });
    }

    const nuevaPropuesta = new Propuesta({
      titulo,
      carrera,
      descripcion,
      organizacion: req.user.id, // viene del middleware auth
    });

    await nuevaPropuesta.save();

    res.status(201).json({ message: "Propuesta creada exitosamente", propuesta: nuevaPropuesta });
  } catch (error) {
    console.error("Error al crear propuesta:", error);
    res.status(500).json({ message: "Error al crear propuesta" });
  }
};

exports.obtenerPropuestas = async (req, res) => {
  try {
    const propuestas = await Propuesta.find().populate("organizacion", "usuario correo");
    res.json(propuestas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener propuestas" });
  }
};

exports.obtenerMisPropuestas = async (req, res) => {
  try {
    if (req.user.rol !== "organizacion") {
      return res.status(403).json({ message: "No autorizado" });
    }

    const propuestas = await Propuesta.find({ organizacion: req.user.id });
    res.json(propuestas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tus propuestas" });
  }
};
exports.getAllPropuestas = async (req, res) => {
  try {
    const propuestas = await Propuesta.find().populate("organizacion", "usuario correo");
    res.json(propuestas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener propuestas" });
  }
};
exports.getPropuestasAprobadas = async (req, res) => {
  try {
    const propuestas = await Propuesta.find({ aprobada: true });
    res.json(propuestas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener propuestas aprobadas" });
  }
};
exports.actualizarAprobacion = async (req, res) => {
  try {
    const { aprobada } = req.body;

    const propuesta = await Propuesta.findByIdAndUpdate(
      req.params.id,
      { aprobada },
      { new: true }
    );

    if (!propuesta) {
      return res.status(404).json({ message: "Propuesta no encontrada" });
    }

    res.json({ message: "Estado actualizado", propuesta });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando estado", error });
  }
};