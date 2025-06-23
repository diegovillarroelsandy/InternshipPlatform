const mongoose = require("mongoose");

const propuestaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  carrera: { type: String, required: true },
  descripcion: { type: String, required: true },
  organizacion: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fecha: { type: Date, default: Date.now },
  aprobada: { type: Boolean, default: false },
});

module.exports = mongoose.model("Propuesta", propuestaSchema);