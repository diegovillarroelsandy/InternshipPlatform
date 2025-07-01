import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Propuestas from "./pages/Propuestas";
import Info from "./pages/Info";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import MisPostulaciones from "./pages/MisPostulaciones";
import ProtectedRoute from "./utils/protectedRoutes";
import PostulacionesOrganizacion from "./pages/PostulacionesOrganizacion";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propuestas" element={<Propuestas />} />
        <Route path="/info" element={<Info />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>Página no encontrada</h1>} />
        
        <Route path="/mis-postulaciones" element={
            <MisPostulaciones />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/postulaciones-organizacion"
  element={
      <PostulacionesOrganizacion />
  }
/>
      </Routes>
    </>
  );
}

export default App;
