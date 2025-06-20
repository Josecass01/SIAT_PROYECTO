// Frontend/src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from '../api/axiosConfig.js';

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.post('/users/register', { firstName, lastName, email, password, invitationCode });
      setLoading(false);
      alert('¡Registro exitoso! Por favor, inicia sesión.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Ocurrió un error en el registro');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-100 to-sky-200">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-start pt-12 px-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
          <div className="flex flex-col items-center pt-8">
            <h1 className="text-2xl font-extrabold text-gray-800">Welcome to SIAT Cartagena</h1>
          </div>
          <div className="mt-6 border-b border-gray-200"><nav className="flex space-x-4 justify-center"><button className="px-4 pb-2 text-sky-600 font-medium border-b-2 border-sky-600">Register</button><Link to="/login" className="px-4 pb-2 text-gray-500 hover:text-gray-700">Login</Link></nav></div>
          <form className="px-6 py-8" onSubmit={handleSubmit}>
            {error && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md text-center">{error}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label>First Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
                />
              </div>
              <div>
                <label>Last Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
                />
              </div>
            </div>
            <div className="mt-4">
              <label>Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
              />
            </div>
            <div className="mt-4">
              <label>Password <span className="text-red-500">*</span></label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
              />
            </div>
            <div className="mt-4">
              <label>Confirm Password <span className="text-red-500">*</span></label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
              />
            </div>
            <div className="mt-4">
              <label htmlFor="invitationCode" className="block text-sm font-medium text-gray-700">Código de Invitación (Opcional)</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="invitationCode"
                  id="invitationCode"
                  placeholder="Ingresa el código si eres una Entidad"
                  value={invitationCode}
                  onChange={(e) => setInvitationCode(e.target.value)}
                  className="block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400"
              >
                {loading ? 'Creando cuenta...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}