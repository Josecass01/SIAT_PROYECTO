// src/components/AttractionCard.jsx
import React from "react";

export default function AttractionCard({ attraction }) {
  const { id, nombre, descripcion, tipo, imagenUrl, rating } = attraction;

  // Función para navegar a la página de detalle
  const handleClick = () => {
    window.location.href = `/attraction/${id}`;
  };

  // Determinar color de la categoría:
  const typeColor = {
    PLAYA: "text-blue-500",
    "UNESCO": "text-yellow-500",
    CULTURAL: "text-pink-500",
    HISTÓRICO: "text-purple-500",
    MONUMENTO: "text-yellow-600",
    MARINO: "text-teal-500",
    BARRIO: "text-orange-500"
  }[tipo] || "text-gray-500";

  // Función para renderizar estrellas según el rating
  const renderStars = (val) => {
    const fullStars = Math.floor(val);
    const halfStar = val - fullStars >= 0.5;
    const totalStars = 5;

    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          className="w-4 h-4 text-yellow-400 inline"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.168 3.586a1 1 0 00.95.69h3.775c.969 0 1.371 1.24.588 1.81l-3.054 2.22a1 1 0 00-.364 1.118l1.168 3.585c.3.922-.755 1.688-1.539 1.118l-3.054-2.22a1 1 0 00-1.175 0l-3.054 2.22c-.783.57-1.838-.196-1.539-1.118l1.168-3.585a1 1 0 00-.364-1.118L2.37 8.013c-.783-.57-.38-1.81.588-1.81h3.775a1 1 0 00.95-.69l1.168-3.586z" />
        </svg>
      );
    }
    if (halfStar) {
      stars.push(
        <svg
          key="half"
          className="w-4 h-4 text-yellow-400 inline"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id={`halfGrad-${id}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#halfGrad-${id})`}
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.168 3.586
               a1 1 0 00.95.69h3.775c.969 0 1.371 1.24.588 1.81l-3.054
               2.22a1 1 0 00-.364 1.118l1.168 3.585c.3.922-.755
               1.688-1.539 1.118l-3.054-2.22a1 1 0 00-1.175
               0l-3.054 2.22c-.783.57-1.838-.196-1.539-1.118l1.168
               -3.585a1 1 0 00-.364-1.118L2.37 8.013c-.783-.57-.38
               -1.81.588-1.81h3.775a1 1 0 00.95-.69l1.168-3.586z"
          />
        </svg>
      );
    }
    const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300 inline"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902
                   0l1.168 3.586a1 1 0 00.95.69h3.775c.969
                   0 1.371 1.24.588 1.81l-3.054 2.22a1 1
                   0 00-.364 1.118l1.168 3.585c.3.922-.755
                   1.688-1.539 1.118l-3.054-2.22a1 1 0
                   00-1.175 0l-3.054 2.22c-.783.57-1.838
                   -.196-1.539-1.118l1.168-3.585a1 1
                   0 00-.364-1.118L2.37 8.013c-.783-.57
                   -.38-1.81.588-1.81h3.775a1 1 0
                   00.95-.69l1.168-3.586z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Imagen superior */}
      <div className="h-48 w-full bg-center bg-cover" style={{ backgroundImage: `url('${imagenUrl}')` }}></div>

      {/* Contenido textual */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{nombre}</h3>

        {/* Rating y categoría */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex">{renderStars(rating)}</div>
          <span className={`text-sm font-medium ${typeColor}`}>{tipo}</span>
        </div>

        {/* Descripción breve */}
        <p className="text-gray-600 text-sm flex-grow">
          {descripcion.length > 100 ? descripcion.slice(0, 100) + "…" : descripcion}
        </p>

        {/* Botón “View Details” centrado abajo */}
        <div className="mt-4">
          <button className="w-full bg-siat-blue text-white py-2 rounded-md hover:bg-blue-500 transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
