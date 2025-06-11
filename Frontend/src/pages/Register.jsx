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
          <div className="flex flex-col items-center pt-8">
            <div className="bg-sky-500 rounded-full p-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z M4 19v-5a4 4 0 014-4h2a4 4 0 014 4v5" /></svg>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-800">Welcome to SIAT Cartagena</h1>
            <p className="text-gray-500 mt-1 text-center px-6">Create an account to explore Cartagena&apos;s treasures</p>
          </div>

          <div className="mt-6 border-b border-gray-200">
            <nav className="flex space-x-4 justify-center">
              <button className="px-4 pb-2 text-sky-600 font-medium border-b-2 border-sky-600">Register</button>
              <Link to="/login" className="px-4 pb-2 text-gray-500 hover:text-gray-700">Login</Link>
            </nav>
          </div>

          <form className="px-6 py-8" onSubmit={handleSubmit}>
            {error && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md text-center">{error}</div>}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                <div className="mt-1"><input type="text" name="firstName" id="firstName" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="block w-full rounded-md border border-gray-700 px-3 py-2"/></div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
                <div className="mt-1"><input type="text" name="lastName" id="lastName" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="block w-full rounded-md border border-gray-700 px-3 py-2"/></div>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
              <div className="mt-1"><input type="email" name="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="block w-full rounded-md border border-gray-700 px-3 py-2"/></div>
            </div>

            <div className="mt-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
              <div className="mt-1"><input type="password" name="password" id="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full rounded-md border border-gray-700 px-3 py-2"/></div>
            </div>

            <div className="mt-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
              <div className="mt-1"><input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="block w-full rounded-md border border-gray-700 px-3 py-2"/></div>
            </div>

            <div className="mt-4 flex items-center">
              <input id="isEntity" name="isEntity" type="checkbox" checked={isEntity} onChange={(e) => setIsEntity(e.target.checked)} className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"/>
              <label htmlFor="isEntity" className="ml-2 block text-sm text-gray-700">I am an <strong>Entidad Calificadora</strong></label>
            </div>

            <div className="mt-6">
              <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-400">
                {loading ? 'Creando cuenta...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
        <div className="mt-6 text-gray-500 text-xs">© 2025 SIAT Cartagena. All rights reserved.</div>
      </div>
    </div>
  );
}