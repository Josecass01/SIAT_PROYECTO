// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import PlaceDetail from "./pages/PlaceDetail"; // para la vista individual más adelante
// import Login from "./pages/Login";
// import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*
          Más rutas:
          <Route path="/places" element={<Places />} />
          <Route path="/attraction/:id" element={<PlaceDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        */}
      </Routes>
    </BrowserRouter>
  );
}
