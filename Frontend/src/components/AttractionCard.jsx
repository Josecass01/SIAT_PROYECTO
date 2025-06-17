// Frontend/src/components/AttractionCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

// El componente ahora acepta una prop `onClick` que le permite al padre (Home/Places)
// manejar la navegación de la tarjeta.
export default function AttractionCard({ attraction, onClick }) { // AÑADIDA prop 'onClick'
  const navigate = useNavigate();

  // La función handleClick local se convierte en un wrapper para la prop 'onClick'
  const handleCardClick = () => {
    // Si se pasa una función onClick desde el padre, la usamos.
    // De lo contrario, usamos la navegación interna.
    if (onClick) {
        onClick(attraction._id);
    } else {
        navigate(`/place/${attraction._id}`); // Fallback si no se pasa onClick
    }
  };

  // Usamos los campos que vienen de la API: '_id', 'nombre', 'categoria', 'descripcion', 'rating', 'numReviews', 'galeria'
  return (
    <div
        // Aquí aplicamos el evento onClick a todo el div principal de la tarjeta
        className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer flex flex-col"
        onClick={handleCardClick} // ¡MODIFICADO: El onClick ahora está en el div principal!
    >
      {/* Badge de calificación */}
      <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
        {(attraction.rating || 0).toFixed(1)} {/* Muestra la calificación correcta */}
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
        {/* Muestra las estrellas y el número de reseñas */}
        <div className="flex items-center text-yellow-500 mt-2">
            {'⭐'.repeat(Math.round(attraction.rating || 0))}
            <span className="text-gray-500 ml-2 text-sm">
                ({(attraction.rating || 0).toFixed(1)} / {attraction.numReviews || 0} reseñas)
            </span>
        </div>
        {/* El botón "View Details" se puede eliminar o hacer que no propague el clic */}
        {/* Si lo quitas, todo el clic se maneja en el div principal.
            Si lo dejas, puedes añadir e.stopPropagation() para que solo el botón sea clicable,
            o dejarlo así si el clic en el botón hace lo mismo que el clic en la tarjeta.
            Por ahora, lo dejaremos como está, asumiendo que el clic en el div principal es suficiente.
        */}
        {/*
        <button
          onClick={handleClick} // Este handleClick ahora será el handleCardClick de arriba
          className="mt-4 py-2 px-4 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
        >
          View Details →
        </button>
        */}
      </div>
    </div>
  );
}