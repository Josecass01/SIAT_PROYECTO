// Frontend/src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const userInfo = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-1">
              <svg className="h-6 w-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z M4 19v-5a4 4 0 014-4h2a4 4 0 014 4v5" /></svg>
              <span className="text-xl font-bold text-sky-600">SIAT Cartagena</span>
            </Link>
          </div>

          <div className="flex space-x-4 items-center">
            <Link to="/" className="text-gray-700 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/places" className="text-gray-700 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium">Places</Link>

            {userInfo ? (
              <>
                <span className="text-gray-700 font-medium">Hola, {userInfo.name.split(' ')[0]}</span>
                <button onClick={logoutHandler} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition">Logout</button>
              </>
            ) : (
              <>
                <Link to="/register" className="bg-sky-100 hover:bg-sky-200 text-sky-800 px-3 py-2 rounded-md text-sm font-medium transition">Register</Link>
                <Link to="/login" className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded-md text-sm font-medium transition">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}