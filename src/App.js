import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Propuestas from "./pages/Propuestas";
import Info from "./pages/Info";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propuestas" element={<Propuestas />} />
        <Route path="/info" element={<Info />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
