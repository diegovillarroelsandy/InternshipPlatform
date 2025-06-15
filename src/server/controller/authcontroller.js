const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { usuario, correo, contrasena, rol } = req.body;

    const userExist = await User.findOne({ correo });
    if (userExist)
      return res.status(400).json({ message: "Correo ya registrado" });

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const newUser = new User({
      usuario,
      correo,
      contraseña: hashedPassword,
      rol,
    });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const user = await User.findOne({ correo });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      user: { id: user._id, usuario: user.usuario, rol: user.rol },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en login", error });
  }
};
