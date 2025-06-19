const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("../config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ rol: "admin" });
    if (!existingAdmin) {
      const newAdmin = new User({
        usuario: "admin",
        correo: "admin@admin.com",
        password: "admin123",
        rol: "admin",
      });
      await newAdmin.save();
      console.log(
        "Administrador por defecto creado: admin@admin.com / admin123"
      );
    }
  } catch (error) {
    console.error("Error al crear el admin por defecto:", error.message);
  }
};

createDefaultAdmin();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));
