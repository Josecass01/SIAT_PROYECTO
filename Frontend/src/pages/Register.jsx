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
  const [isEntity, setIsEntity] = useState(false);
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
      await api.post('/users/register', { firstName, lastName, email, password, isEntity });
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
            <div className="flex flex-col items-center pt-8"><h1 className="text-2xl font-extrabold text-gray-800">Welcome</h1></div>
            <div className="mt-6 border-b border-gray-200"><nav className="flex space-x-4 justify-center"><button className="px-4 pb-2 text-sky-600 font-medium border-b-2 border-sky-600">Register</button><Link to="/login" className="px-4 pb-2 text-gray-500 hover:text-gray-700">Login</Link></nav></div>
            <form className="px-6 py-8" onSubmit={handleSubmit}>
                {error && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md text-center">{error}</div>}
                {/* Form Inputs... */}
                <div className="mt-6"><button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400">{loading ? 'Creando cuenta...' : 'Create Account'}</button></div>
            </form>
        </div>
      </div>
    </div>
  );
}