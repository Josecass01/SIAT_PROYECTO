// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AttractionDetail from "./pages/AttractionDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA PRINCIPAL */}
        <Route path="/" element={<Home />} />
        {/* Detalle individual de un atractivo */}
        <Route path="/attraction/:id" element={<AttractionDetail />} />
        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
