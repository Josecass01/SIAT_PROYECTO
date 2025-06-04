// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post("/api/auth/register", { username, email, password })
    //   .then(res => navigate("/login"))
    //   .catch(err => setError("Error al registrar"));

    // Mock de éxito:
    console.log("Register:", { username, email, password });
    setTimeout(() => navigate("/login"), 800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-siat-gray font-sans">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/" className="text-siat-blue font-medium hover:underline">
            ← Volver a Home
          </Link>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Regístrate
          </h1>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-1"
              >
                Usuario
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-siat-blue"
                placeholder="Tu nombre de usuario"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-siat-blue"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-siat-blue"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-siat-blue text-white rounded-md hover:bg-blue-500 transition"
            >
              Crear Cuenta
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-siat-blue hover:underline">
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>

      <footer className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          © 2025 SIAT Cartagena. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
