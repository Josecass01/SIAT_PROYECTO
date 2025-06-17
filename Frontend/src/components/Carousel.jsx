// Frontend/src/components/Carousel.jsx
import React, { useState, useEffect, useRef } from "react";

// El componente Carousel ahora recibe 'items' (los datos de los atractivos)
// y 'onItemClick' (la función para manejar la navegación al hacer clic).
export default function Carousel({ items, onItemClick }) { 
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    // Configura el temporizador para el avance automático de los slides
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1 // Usa 'items.length' para saber cuándo volver al inicio
      );
    }, 5000); // Cambia de slide cada 5 segundos (puedes ajustar este valor)

    return () => {
      resetTimeout(); // Limpia el temporizador cuando el componente se desmonte o el efecto se re-ejecute
    };
  }, [currentIndex, items.length]); // Las dependencias aseguran que el efecto se re-ejecute si los ítems cambian

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1 // Navega al slide anterior
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1 // Navega al slide siguiente
    );
  };

  // Si no hay ítems en la lista, no renderizamos el carrusel
  if (!items || items.length === 0) {
    return null; 
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-lg shadow-lg">
      {/* Contenedor de los slides con transformación para el movimiento */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => ( // Mapeamos sobre los 'items' recibidos
          <div
            key={item.attractionId} // Usamos 'attractionId' como clave única para cada slide
            className="min-w-full h-64 md:h-96 bg-cover bg-center flex items-center justify-center cursor-pointer" // Añadido 'cursor-pointer' para indicar que es clicable
            style={{
              // Usa 'item.url' para la imagen de fondo, que viene del backend
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${item.url}')`,
            }}
            // Al hacer clic en un slide, se llama a onItemClick con el ID del atractivo
            onClick={() => onItemClick(item.attractionId)} 
          >
            <div className="text-center text-white px-4">
              <h2 className="text-xl md:text-3xl font-bold">
                {item.attractionName} {/* Muestra el nombre del atractivo */}
              </h2>
              {/* Si tu backend enviara un 'subtitle' o 'description' para el carrusel, podrías mostrarlo aquí */}
              {/* <p className="mt-2 text-sm md:text-base">{item.subtitle}</p> */}
            </div>
          </div>
        ))}
      </div>

      {/* Botón para el slide anterior */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60 transition"
      >
        ‹
      </button>

      {/* Botón para el slide siguiente */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60 transition"
      >
        ›
      </button>

      {/* Indicadores de los slides (dots) */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {items.map((_, idx) => ( // Mapeamos sobre los 'items' para los indicadores
          <span
            key={idx}
            className={`h-2 w-2 rounded-full transition-all cursor-pointer ${
              idx === currentIndex
                ? "bg-white scale-125"
                : "bg-gray-300 hover:bg-gray-500"
            }`}
            onClick={() => setCurrentIndex(idx)} // Permite saltar a un slide específico
          ></span>
        ))}
      </div>
    </div>
  );
}