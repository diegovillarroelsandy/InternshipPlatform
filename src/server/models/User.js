const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  rol: {
    type: String,
    enum: ["estudiante", "admin", "organizacion"],
    default: "usuario",
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
