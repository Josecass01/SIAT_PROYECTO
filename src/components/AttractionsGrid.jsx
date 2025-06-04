// src/components/AttractionsGrid.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AttractionsGrid({ attractions }) {
  const navigate = useNavigate();

  if (!attractions || attractions.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500">No hay atractivos disponibles.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6">
        Atractivos Destacados
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions.map((attr) => (
          <div
            key={attr.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
            onClick={() => navigate(`/attraction/${attr.id}`)}
          >
            {/* Imagen de cada tarjeta */}
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url('${attr.imageUrl}')` }}
            ></div>
            {/* Contenido textual dentro de la tarjeta */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{attr.name}</h3>
              <p className="text-sm text-gray-500 uppercase mt-1 mb-2">
                {attr.category}
              </p>
              <p className="text-gray-600 text-sm line-clamp-3">
                {attr.description}
              </p>
              <button className="mt-4 inline-block bg-sky-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-sky-600 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
