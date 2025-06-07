// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Places from "./pages/Places";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AttractionDetail from "./pages/AttractionDetail"; // Si la tienes ya creada

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places" element={<Places />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place/:id" element={<AttractionDetail />} />
        {/* … Otras rutas */}
      </Routes>
    </BrowserRouter>
  );
}
<BrowserRouter>
  <Routes>
    {/* ... */}
    <Route path="/place/:id" element={<AttractionDetail />} />
    {/* ... */}
  </Routes>
</BrowserRouter>
export default App;
