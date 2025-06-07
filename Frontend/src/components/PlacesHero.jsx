// src/components/PlacesHero.jsx
import React from "react";
import { FiSearch } from "react-icons/fi"; // Si no lo tienes: npm install react-icons@4.7.1

export default function PlacesHero({ searchText, setSearchText }) {
  return (
    <div className="w-full relative">
      {/* FOTO DE LA CIUDAD como fondo */}
      <div
        className="w-full h-80 sm:h-96 md:h-112 lg:h-128 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1559757175-e7e6f4b42a5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')", 
          /* ↑ Reemplaza esta URL con tu propia foto de Cartagena */
        }}
      ></div>

      {/* Overlay semitransparente para mejorar el contraste del texto */}
      <div className="absolute inset-0 bg-blue-600 bg-opacity-60"></div>

      {/* CONTENIDO ENCIMA DE LA IMAGEN */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        {/* TITULO */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center">
          Explore Cartagena’s Treasures
        </h1>
        {/* SUBTITULO */}
        <p className="mt-2 text-lg sm:text-xl text-blue-200 text-center max-w-2xl">
          Discover the rich history, stunning architecture, and natural beauty of one of Colombia’s most enchanting cities
        </p>

        {/* CAJA DE BÚSQUEDA */}
        <div className="mt-8 w-full max-w-xl">
          <div className="relative">
            {/* Ícono de lupa */}
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

            {/* INPUT DE BÚSQUEDA con fondo blanco */}
            <input
              type="text"
              placeholder="Search for places..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
