const express = require("express");
const router = express.Router();
const { register } = require("../controller/authcontroller");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Asegúrate que la ruta sea correcta

router.post("/register", register);

router.post("/login", async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const user = await User.findOne({ correo });

    if (!user) {
      return res.status(401).json({ message: "Correo no registrado" });
    }

    // Validación de contraseña (sin hashing por ahora)
    if (user.password !== contrasena) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, correo: user.correo, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      user: {
        usuario: user.usuario,
        rol: user.rol,
        correo: user.correo,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

module.exports = router;
