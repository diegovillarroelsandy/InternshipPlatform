const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  rol: { type: String, enum: ["usuario", "admin"], default: "usuario" },
  contraseña: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
