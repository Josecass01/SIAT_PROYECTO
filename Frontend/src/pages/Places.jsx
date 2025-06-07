// src/pages/Places.jsx

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import SortDropdown from "../components/SortDropdown";
import AttractionCard from "../components/AttractionCard";

// Datos de ejemplo (simulando lo que vendría de la base de datos)
const mockAttractions = [
  {
    id: "1",
    name: "Walled City of Cartagena",
    category: "UNESCO Site",
    description:
      "La histórica ciudad amurallada de Cartagena es Patrimonio de la Humanidad por la UNESCO, repleta de calles coloridas.",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
  },
  {
    id: "2",
    name: "Castillo San Felipe de Barajas",
    category: "Historical",
    description:
      "La mayor fortaleza construida por los españoles en sus antiguas colonias. Ubicada en la colina de San Lázaro para defenderse.",
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Getsemaní",
    category: "Cultural",
    description:
      "Una vez barrio obrero, Getsemaní se ha convertido en un vibrante centro cultural con arte urbano y restaurantes locales.",
    imageUrl:
      "https://images.unsplash.com/photo-1584060649280-a032f84d40e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Convento de la Popa",
    category: "Religious",
    description:
      "Ubicado en el punto más alto de Cartagena, este convento del siglo XVII ofrece vistas panorámicas de la ciudad y la bahía.",
    imageUrl:
      "https://images.unsplash.com/photo-1573844325007-862c78256ecb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
  },
  {
    id: "5",
    name: "Rosario Islands",
    category: "Natural",
    description:
      "Un archipiélago de 27 islas con aguas cristalinas, arrecifes de coral y playas de arena blanca, perfecto para snorkel y relajarse.",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
  },
  {
    id: "6",
    name: "Palace of the Inquisition",
    category: "Historical",
    description:
      "Un bello ejemplo de arquitectura colonial que alberga un museo que detalla la historia de la Inquisición en Cartagena.",
    imageUrl:
      "https://images.unsplash.com/photo-1561318582-86c20e8b4a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
  },
];

export default function Places() {
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("highest");
  const [filteredAttractions, setFilteredAttractions] = useState([]);

  const categories = [
    "All",
    "Historical",
    "Cultural",
    "Natural",
    "UNESCO Site",
    "Religious",
  ];

  useEffect(() => {
    let temp = mockAttractions.filter((a) =>
      a.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (activeCategory !== "All") {
      temp = temp.filter((a) => a.category === activeCategory);
    }

    if (sortOption === "highest") {
      temp.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "lowest") {
      temp.sort((a, b) => a.rating - b.rating);
    } else if (sortOption === "alphabetical") {
      temp.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredAttractions(temp);
  }, [searchText, activeCategory, sortOption]);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* NAVBAR */}
      <Navbar />

      {/* ESPACIO ENTRE NAVBAR Y FILTROS */}
      <div className="mt-6" />

      {/* FILTROS + SEARCH + SORT (fondo blanco con sombras y bordes redondeados) */}
      <div className="bg-white shadow-md rounded-lg mx-4 lg:mx-8 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* FilterBar */}
          <div className="flex-shrink-0">
            <FilterBar
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>

          {/* Search Input (más pequeño, con margen para separación) */}
          <div className="flex-grow lg:flex-none lg:w-1/4">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
            />
          </div>

          {/* SortDropdown con margen izquierdo para no pegarse */}
          <div className="flex-shrink-0">
            <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
          </div>
        </div>
      </div>

      {/* SEPARADOR */}
      <div className="border-b border-gray-200 my-6 mx-4 lg:mx-8" />

      {/* GRID DE ATRACCIONES */}
      <div className="flex-grow max-w-6xl mx-auto px-4 lg:px-8 py-2">
        {filteredAttractions.length === 0 ? (
          <p className="text-center text-gray-500">No se encontraron resultados.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-white py-4 text-center text-gray-500 text-sm">
        © 2025 SIAT Cartagena. All rights reserved.
      </footer>
    </div>
  );
}
