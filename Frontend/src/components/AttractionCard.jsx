// Frontend/src/components/AttractionCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AttractionCard({ attraction, onClick }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onClick) {
      onClick(attraction._id);
    } else {
      navigate(`/place/${attraction._id}`);
    }
  };

  return (
    <div
      // MODIFICADO: Añadimos clases de ancho fijo y altura mínima
      // w-[300px] establece un ancho fijo de 300px.
      // h-full asegura que la tarjeta ocupe toda la altura disponible en su contenedor.
      // flex-shrink-0 previene que la tarjeta se encoja si no hay espacio.
      // min-h-[400px] asegura una altura mínima si el contenido es escaso.
      className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer flex flex-col w-[300px] h-full flex-shrink-0 min-h-[400px]"
      onClick={handleCardClick}
    >
      {/* Badge de calificación */}
      <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
        {(attraction.rating || 0).toFixed(1)}
      </div>

      {/* Imagen (usamos la primera de la galería) */}
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url('${attraction.galeria?.[0] || 'https://via.placeholder.com/500' }')` }}
      ></div>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Aseguramos que el título también se trunque si es muy largo */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {attraction.nombre}
        </h3>
        <p className="text-sm text-blue-500 uppercase mt-1">{attraction.categoria}</p>
        {/* La descripción ya se trunca con slice(0, 80) y "...". Usamos line-clamp-3 para más control. */}
        <p className="mt-2 text-gray-600 text-sm flex-grow line-clamp-3">
          {attraction.descripcion}
        </p>
        {/* Muestra las estrellas y el número de reseñas */}
        <div className="flex items-center text-yellow-500 mt-2">
          {'⭐'.repeat(Math.round(attraction.rating || 0))}
          <span className="text-gray-500 ml-2 text-sm">
            ({(attraction.rating || 0).toFixed(1)} / {attraction.numReviews || 0} reseñas)
          </span>
        </div>
      </div>
    </div>
  );
}