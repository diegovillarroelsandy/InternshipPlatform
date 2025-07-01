const Postulacion = require("../models/Postulacion");
const Propuesta = require("../models/Propuesta");

exports.crearPostulacion = async (req, res) => {
  try {
    const { propuestaId, presentacion } = req.body;

    // Validar si la propuesta existe
    const propuesta = await Propuesta.findById(propuestaId);
    if (!propuesta) {
      return res.status(404).json({ message: "Propuesta no encontrada" });
    }

    const nuevaPostulacion = new Postulacion({
      propuesta: propuestaId,
      estudiante: req.user.id,
      presentacion,
    });

    await nuevaPostulacion.save();

    res
      .status(201)
      .json({ message: "Postulación enviada", postulacion: nuevaPostulacion });
  } catch (error) {
    res.status(500).json({ message: "Error creando postulación", error });
  }
};

exports.getPostulacionesEstudiante = async (req, res) => {
  try {
    const postulaciones = await Postulacion.find({ estudiante: req.user.id })
      .populate({
        path: "propuesta",
        populate: {
          path: "organizacion",
          model: "User", // debe coincidir con el modelo
          select: "usuario correo", // campos que quieras mostrar
        },
      })
      .sort({ fecha: -1 });

    res.json(postulaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener tus postulaciones" });
  }
};

exports.getPostulacionesAdmin = async (req, res) => {
  try {
    const postulaciones = await Postulacion.find()
      .populate("propuesta")
      .populate("estudiante", "usuario correo");
    res.json(postulaciones);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo postulaciones", error });
  }
};

exports.getPostulacionesOrganizacion = async (req, res) => {
  try {
    // Encontrar propuestas de la organización actual
    const propuestasOrg = await Propuesta.find({
      organizacion: req.user.id,
    }).select("_id");
    const propuestasIds = propuestasOrg.map((p) => p._id);

    const postulaciones = await Postulacion.find({
      propuesta: { $in: propuestasIds },
    })
      .populate("propuesta")
      .populate("estudiante", "usuario correo");
    res.json(postulaciones);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo postulaciones", error });
  }
};

exports.deletePostulacion = async (req, res) => {
  try {
    const { id } = req.params;

    const postulacion = await Postulacion.findByIdAndDelete(id);
    if (!postulacion) {
      return res.status(404).json({ message: "Postulación no encontrada" });
    }

    res.json({ message: "Postulación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando postulación", error });
  }
};
exports.updatePostulacion = async (req, res) => {
  try {
    const { presentacion } = req.body;
    const postulacionId = req.params.id;

    const updatedPostulacion = await Postulacion.findByIdAndUpdate(
      postulacionId,
      { presentacion },
      { new: true }
    );

    if (!updatedPostulacion) {
      return res.status(404).json({ message: "Postulación no encontrada" });
    }

    res.json({
      message: "Postulación actualizada correctamente",
      postulacion: updatedPostulacion,
    });
  } catch (error) {
    console.error("Error actualizando postulación:", error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};