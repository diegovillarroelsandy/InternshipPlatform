const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { auth, isAdmin } = require("../middleware/authMiddleware");

router.get("/", auth, isAdmin, async (req, res) => {
  const users = await User.find().select("-contraseña");
  res.json(users);
});

router.put("/:id", auth, isAdmin, async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

router.delete("/:id", auth, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Usuario eliminado" });
});

router.post("/", auth, isAdmin, async (req, res) => {
  try {
    console.log("Request body:", req.body);
    if (req.user.rol !== "admin") {
      return res
        .status(403)
        .json({ message: "Solo el administrador puede crear usuarios" });
    }

    const { usuario, correo, rol, password } = req.body;

    if (!usuario || !correo || !rol || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const existingUser = await User.findOne({ correo });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está en uso" });
    }

    const newUser = new User({ usuario, correo, rol, password });
    await newUser.save();

    res.status(201).json({
      message: "Usuario creado exitosamente",
      usuario: {
        _id: newUser._id,
        usuario: newUser.usuario,
        correo: newUser.correo,
        rol: newUser.rol,
      },
    });
  } catch (error) {
    console.error("Error creando usuario:", error);
    res
      .status(500)
      .json({ message: "Error al crear el usuario", error: error.message });
  }
});

module.exports = router;
