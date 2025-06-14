// Frontend/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Places from "./pages/Places";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AttractionDetail from "./pages/AttractionDetail";
import EditAttraction from './pages/EditAttraction';
import AdminPanel from './pages/AdminPanel'; // <-- 1. Importar el panel
import SuperAdminRoute from './components/auth/SuperAdminRoute'; // <-- 2. Importar el guardia

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/places" element={<Places />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place/:id" element={<AttractionDetail />} />
        <Route path="/place/:id/edit" element={<EditAttraction />} />

        {/* --- NUEVA RUTA PROTEGIDA PARA ADMINS --- */}
        <Route path='' element={<SuperAdminRoute />}>
            <Route path='/admin' element={<AdminPanel />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;