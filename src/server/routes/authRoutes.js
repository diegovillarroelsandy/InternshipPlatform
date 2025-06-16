const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/authcontroller");
const jwt = require("jsonwebtoken");

router.post("/register", register);

router.post("/login", (req, res) => {
  const { correo, contrasena } = req.body;

  // Crea un token real
  const token = jwt.sign(
    { correo, rol: "admin" }, // payload
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({
    token,
    user: {
      usuario: "admin",
      rol: "admin",
      correo,
    },
  });
});

module.exports = router;
