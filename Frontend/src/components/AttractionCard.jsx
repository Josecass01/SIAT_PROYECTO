// Frontend/src/components/AttractionCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AttractionCard({ attraction }) {
  const navigate = useNavigate();

  // MongoDB usa '_id' en lugar de 'id'
  const handleClick = () => {
    navigate(`/place/${attraction._id}`);
  };

  // Usamos los campos que vienen de la API: '_id', 'nombre', 'categoria', 'descripcion', 'rating_usuario', 'galeria'
  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer flex flex-col">
      {/* Badge de calificación */}
      <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
        {(attraction.rating_usuario || 0).toFixed(1)}
      </div>

      {/* Imagen (usamos la primera de la galería) */}
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url('${attraction.galeria?.[0] || 'https://via.placeholder.com/500' }')` }}
      ></div>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{attraction.nombre}</h3>
        <p className="text-sm text-blue-500 uppercase mt-1">{attraction.categoria}</p>
        <p className="mt-2 text-gray-600 text-sm flex-grow">
          {attraction.descripcion.length > 80
            ? attraction.descripcion.slice(0, 80) + "..."
            : attraction.descripcion}
        </p>
        <button
          onClick={handleClick}
          className="mt-4 py-2 px-4 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
        >
          View Details →
        </button>
      </div>
    </div>
  );
}