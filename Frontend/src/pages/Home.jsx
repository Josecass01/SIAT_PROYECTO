// src/pages/Home.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";

export default function Home() {
  const [slides, setSlides] = useState([]);
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    // Simulación de datos
    setSlides([
      {
        id: 1,
        title: "Castillo San Felipe de Barajas",
        subtitle: "Historia colonial de Cartagena.",
        imageUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2069&q=80",
      },
      {
        id: 2,
        title: "Ciudad Amurallada",
        subtitle: "Patrimonio UNESCO con arquitectura colonial.",
        imageUrl:
          "https://images.unsplash.com/photo-1531219432768-9f540ce91ef3?auto=format&fit=crop&w=2070&q=80",
      },
      {
        id: 3,
        title: "Islas del Rosario",
        subtitle: "Paraíso marino caribeño.",
        imageUrl:
          "https://images.unsplash.com/photo-1440688807730-73e4e2169fb5?auto=format&fit=crop&w=2070&q=80",
      },
    ]);

    setAttractions([
      {
        id: "1",
        name: "Castillo San Felipe de Barajas",
        category: "Histórico",
        description:
          "La mayor fortaleza construida por los españoles en sus antiguas colonias, ubicada en la colina de San Lázaro para defenderse.",
        imageUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "2",
        name: "Walled City of Cartagena",
        category: "UNESCO Site",
        description:
          "La histórica ciudad amurallada de Cartagena es Patrimonio de la Humanidad por la UNESCO, repleta de calles coloridas.",
        imageUrl:
          "https://images.unsplash.com/photo-1581833971358-9f540ce91ef3?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "3",
        name: "Getsemaní",
        category: "Cultural",
        description:
          "Una vez barrio obrero, Getsemaní se ha convertido en un vibrante centro cultural con arte urbano y restaurantes locales.",
        imageUrl:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=500&q=80",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      {/* Carrusel */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4">
          <Carousel slides={slides} />
        </div>
      </section>

      {/* Atractivos Destacados */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Atractivos Destacados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {attractions.map((attr) => (
              <Link
                to={`/place/${attr.id}`}
                key={attr.id}
                className="block bg-white rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={attr.imageUrl}
                  alt={attr.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    {attr.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {attr.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
