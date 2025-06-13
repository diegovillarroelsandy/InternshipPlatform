const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "El usuario ya existe" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashed });

    res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Credenciales inválidas" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Credenciales inválidas" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user: { email: user.email } });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor" });
  }
};
