// Frontend/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Places from "./pages/Places";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AttractionDetail from "./pages/AttractionDetail";
import CreateAttraction from './pages/CreateAttraction';
import EditAttraction from './pages/EditAttraction';
import AdminPanel from './pages/AdminPanel';
import SuperAdminRoute from './components/auth/SuperAdminRoute';
import EntityRoute from './components/auth/EntityRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Rutas Públicas --- */}
        <Route path="/" element={<Home />} />
        <Route path="/places" element={<Places />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place/:id" element={<AttractionDetail />} />

        {/* --- Rutas Protegidas para Entidades (y SuperAdmin) --- */}
        <Route path='' element={<EntityRoute />}>
            <Route path='/create-attraction' element={<CreateAttraction />} />
            <Route path="/place/:id/edit" element={<EditAttraction />} />
        </Route>

        {/* --- Ruta Protegida para SuperAdmin --- */}
        <Route path='' element={<SuperAdminRoute />}>
            <Route path='/admin' element={<AdminPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;