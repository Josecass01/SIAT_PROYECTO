// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Asegúrate de que exista tu componente Navbar

export default function Register() {
  const navigate = useNavigate();

  // Estados locales para cada campo del formulario
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEntity, setIsEntity] = useState(false); // Checkbox “Entidad Calificadora”

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la llamada a tu backend / validación
    console.log({ firstName, lastName, email, password, confirmPassword, isEntity });
    navigate("/"); // Después de registrar, redirigir a Home
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-100 to-sky-200">
      {/* ---------------- NAVBAR ---------------- */}
      <Navbar />

      {/* --------- CONTENIDO PRINCIPAL ---------- */}
      <div className="flex-grow flex flex-col items-center justify-start pt-12 px-4">
        {/* Se agrega pt-12 para crear el espacio entre Navbar y la tarjeta */}
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
          {/* ---------- HEADER DE LA TARJETA ---------- */}
          <div className="flex flex-col items-center pt-8">
            <div className="bg-sky-500 rounded-full p-3 mb-4">
              {/* Ícono redondo (cámbialo si lo deseas) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z M4 19v-5a4 4 0 014-4h2a4 4 0 014 4v5"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-800">
              Welcome to SIAT Cartagena
            </h1>
            <p className="text-gray-500 mt-1 text-center px-6">
              Create an account to explore Cartagena&apos;s treasures
            </p>
          </div>

          {/* ---------- PESTAÑAS Register / Login ---------- */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="flex space-x-4 justify-center">
              <button
                className="px-4 pb-2 text-sky-600 font-medium border-b-2 border-sky-600"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
              <Link
                to="/login"
                className="px-4 pb-2 text-gray-500 hover:text-gray-700"
              >
                Login
              </Link>
            </nav>
          </div>

          {/* ---------- FORMULARIO DE REGISTRO ---------- */}
          <form className="px-6 py-8" onSubmit={handleSubmit}>
            {/* First Name / Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="block w-full rounded-md border border-gray-700 px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="block w-full rounded-md border border-gray-700 px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border border-gray-700 px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border border-gray-700 px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mt-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border border-gray-700 px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Checkbox: ¿Es Entidad Calificadora? */}
            <div className="mt-4 flex items-center">
              <input
                id="isEntity"
                name="isEntity"
                type="checkbox"
                checked={isEntity}
                onChange={(e) => setIsEntity(e.target.checked)}
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isEntity"
                className="ml-2 block text-sm text-gray-700"
              >
                I am an <strong>Entidad Calificadora</strong>
              </label>
            </div>

            {/* Create Account Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 text-sm font-medium transition"
              >
                Create Account
              </button>
            </div>

            {/* Or continue with */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm mb-4">Or continue with</p>
              <div className="flex justify-center space-x-4">
                {/* Google */}
                <button
                  type="button"
                  className="flex items-center justify-center p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                >
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.4 0 6.2 1.2 8.4 3.2l6.3-6.2C34 2.7 29.6.5 24 .5 14.7.5 6.3 5.7 2.3 13.5l7.3 5.7C11.6 13.2 17.3 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.5 24c0-1.5-.1-2.9-.4-4.3H24v8.2h12.7c-.5 2.7-1.9 5-4 6.6l6.5 5c3.8-3.5 6-8.6 6-15.5z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.6 28.6c-.5-1.5-.8-3-.8-4.6 0-1.6.3-3.1.8-4.6L3.3 13.7C1.2 16.9.5 20.3.5 24s.7 7.1 2.8 10.3l7.5-5.7z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 46.5c5.6 0 10.4-1.9 13.8-5.1l-6.5-5c-1.8 1.2-4 1.9-7.3 1.9-6.7 0-12.4-3.7-15.1-9.1l-7.3 5.6C6.3 42.3 14.7 46.5 24 46.5z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                </button>
                {/* Facebook */}
                <button
                  type="button"
                  className="flex items-center justify-center p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                >
                  <svg
                    className="h-5 w-5 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.88v-6.99H7.898v-2.89h2.54V9.846c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89H13.66v6.99C18.343 21.128 22 16.992 22 12z" />
                  </svg>
                </button>
                {/* Twitter */}
                <button
                  type="button"
                  className="flex items-center justify-center p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                >
                  <svg
                    className="h-5 w-5 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.5.5c-2.52 0-4.57 2.04-4.57 4.56 0 .36.04.71.1 1.05C7.69 6.74 4.07 4.81 1.64 1.82a4.5 4.5 0 00-.62 2.29c0 1.58.81 2.97 2.04 3.78a4.52 4.52 0 01-2.07-.57v.06c0 2.21 1.57 4.05 3.65 4.47a4.53 4.53 0 01-2.06.08A4.58 4.58 0 005.58 13.5a9.04 9.04 0 01-6.64 1.84A12.76 12.76 0 006.29 17c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.36 8.36 0 0023 3z" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ----- PIE DE PÁGINA ----- */}
        <div className="mt-6 text-gray-500 text-xs">
          © 2025 SIAT Cartagena. All rights reserved.
        </div>
      </div>
    </div>
  );
}
