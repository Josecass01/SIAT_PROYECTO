// Frontend/src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from '../api/axiosConfig.js';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/users/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Ocurrió un error al iniciar sesión');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-100 to-sky-200">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-start pt-12 px-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
          <div className="flex flex-col items-center pt-8"><h1 className="text-2xl font-extrabold text-gray-800">Bienvenido de nuevo</h1></div>
          <div className="mt-6 border-b border-gray-200"><nav className="flex space-x-4 justify-center"><Link to="/register" className="px-4 pb-2 text-gray-500 hover:text-gray-700">Register</Link><button className="px-4 pb-2 text-sky-600 font-medium border-b-2 border-sky-600">Inico de Sesion </button></nav></div>
          <form className="px-6 py-8" onSubmit={handleSubmit}>
            {error && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md text-center">{error}</div>}
            <div className="mt-4">
              <label htmlFor="email">Correo Electronico <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password">Contraseña <span className="text-red-500">*</span></label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-white bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400"
              >
                {loading ? 'Iniciando sesión...' : 'Log In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}