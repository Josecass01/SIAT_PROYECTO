// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import AttractionsGrid from "../components/AttractionsGrid";
// Si tuvieras un backend REST, descomenta estas líneas y ajusta la URL:
// import axios from "axios";

export default function Home() {
  const [slides, setSlides] = useState([]);
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    // SIMULACIÓN de datos (en producción, harías axios.get("/api/slides") etc.)
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
        id: 1,
        name: "Castillo San Felipe de Barajas",
        category: "Histórico",
        description:
          "La mayor fortaleza construida por los españoles en sus antiguas colonias, ubicada en la colina de San Lázaro para defenderse.",
        imageUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 2,
        name: "Walled City of Cartagena",
        category: "UNESCO Site",
        description:
          "La histórica ciudad amurallada de Cartagena es Patrimonio de la Humanidad por la UNESCO, repleta de calles coloridas.",
        imageUrl:
          "https://images.unsplash.com/photo-1581833971358-9f540ce91ef3?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 3,
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
    <div className="min-h-screen bg-siat-gray">
      <Navbar />

      {/* TÍTULO PRINCIPAL */}
      <header className="bg-white">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Explore the most iconic and breathtaking locations that Cartagena has to
            offer
          </h1>
        </div>
      </header>

      {/* CARRUSEL */}
      <section className="py-8">
        <Carousel slides={slides} />
      </section>

      {/* GRID DE ATRACTIVOS DESTACADOS */}
      <section className="py-8">
        <AttractionsGrid attractions={attractions} />
      </section>
    </div>
  );
}
