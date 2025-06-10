// Frontend/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Places from "./pages/Places";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AttractionDetail from "./pages/AttractionDetail";
import EditAttraction from './pages/EditAttraction'; // <-- 1. Importar

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places" element={<Places />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place/:id" element={<AttractionDetail />} />
        <Route path="/place/:id/edit" element={<EditAttraction />} /> {/* <-- 2. Añadir ruta */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;