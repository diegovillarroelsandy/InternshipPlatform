const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postulacionSchema = new Schema({
  propuesta: { type: Schema.Types.ObjectId, ref: "Propuesta", required: true },
  estudiante: { type: Schema.Types.ObjectId, ref: "User", required: true },
  presentacion: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Postulacion", postulacionSchema);
