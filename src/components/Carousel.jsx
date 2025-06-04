// Ejemplo:
const slides = [
  {
    id: 1,
    title: "Castillo San Felipe",
    subtitle: "La mayor fortaleza construida por los españoles...",
    imageUrl: "https://ruta-a-tu-imagen1.jpg",
  },
  {
    id: 2,
    title: "Ciudad Amurallada",
    subtitle: "UNESCO Site, arquitectura colonial…",
    imageUrl: "https://ruta-a-tu-imagen2.jpg",
  },
  {
    id: 3,
    title: "Islas del Rosario",
    subtitle: "Paraíso marino caribeño…",
    imageUrl: "https://ruta-a-tu-imagen3.jpg",
  },
];
// src/components/Carousel.jsx
import React, { useState, useEffect, useRef } from "react";

export default function Carousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Cambiar de slide automáticamente cada 5 segundos
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length),
      5000
    );
    return () => {
      resetTimeout();
    };
  }, [currentIndex, slides.length]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-lg shadow-lg">
      {/* Slide container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="min-w-full h-64 md:h-96 bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${slide.imageUrl}')`,
            }}
          >
            {/* Contenido de texto sobre la imagen */}
            <div className="text-center text-white px-4">
              <h2 className="text-2xl md:text-4xl font-bold">{slide.title}</h2>
              <p className="mt-2 text-sm md:text-base">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón anterior */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60 transition"
      >
        ‹
      </button>
      {/* Botón siguiente */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60 transition"
      >
        ›
      </button>

      {/* Indicadores (dots) */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full transition-all ${
              idx === currentIndex
                ? "bg-white scale-125"
                : "bg-gray-300 hover:bg-gray-500"
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}
