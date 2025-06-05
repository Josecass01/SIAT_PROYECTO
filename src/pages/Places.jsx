// src/pages/Places.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PlacesHero from "../components/PlacesHero";
import FilterBar from "../components/FilterBar";
import SortDropdown from "../components/SortDropdown";
import AttractionCard from "../components/AttractionCard";

// Datos de ejemplo (simulando lo que vendría de la base de datos)
const mockAttractions = [
  {
    id: 1,
    name: "Walled City of Cartagena",
    category: "UNESCO Site",
    description:
      "The historic walled city of Cartagena is a UNESCO World Heritage site featuring colorful colonial buildings, cobblestone streets, and vibrant plazas.",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Castillo San Felipe de Barajas",
    category: "Historical",
    description:
      "The greatest fortress ever built by the Spanish in any of their colonies. The castle is located on the Hill of San Lázaro in a strategic location overlooking the city.",
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Getsemaní",
    category: "Cultural",
    description:
      "Once a working-class neighborhood, Getsemaní has transformed into a vibrant cultural hub with street art, local restaurants, and live music venues.",
    imageUrl:
      "https://images.unsplash.com/photo-1584060649280-a032f84d40e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Convento de la Popa",
    category: "Historical",
    description:
      "Located on the highest point in Cartagena, this 17th-century convent offers panoramic views of the city and the bay below.",
    imageUrl:
      "https://images.unsplash.com/photo-1573844325007-862c78256ecb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Rosario Islands",
    category: "Natural",
    description:
      "An archipelago of 27 islands with crystal clear waters, coral reefs, and white sand beaches, perfect for snorkeling and relaxing.",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Palace of the Inquisition",
    category: "Historical",
    description:
      "A beautiful example of colonial architecture that houses a museum detailing the history of the Inquisition in Cartagena.",
    imageUrl:
      "https://images.unsplash.com/photo-1561318582-86c20e8b4a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
  },
];

export default function Places() {
  // Estados de búsqueda, filtro y ordenamiento
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("highest");
  const [filteredAttractions, setFilteredAttractions] = useState([]);

  // Categorías disponibles (“All” + categorías únicas de los datos)
  const categories = ["All", "Historical", "Cultural", "Natural", "UNESCO Site", "Religious"];

  useEffect(() => {
    // 1) Filtrar por búsqueda
    let temp = mockAttractions.filter((a) =>
      a.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // 2) Filtrar por categoría
    if (activeCategory !== "All") {
      temp = temp.filter((a) => a.category === activeCategory);
    }

    // 3) Ordenar según sortOption
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ---------------- NAVBAR ---------------- */}
      <Navbar />

      {/* ---------- HERO + SEARCH ---------- */}
      <PlacesHero searchText={searchText} setSearchText={setSearchText} />

      {/* ---------- BARRA DE FILTROS + ORDEN ---------- */}
      <div className="bg-white shadow-sm py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* FilterBar */}
          <FilterBar
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* SortDropdown */}
          <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
        </div>
      </div>

      {/* ---------- GRID DE ATRACCIONES ---------- */}
      <div className="flex-grow max-w-6xl mx-auto px-4 py-8">
        {filteredAttractions.length === 0 ? (
          <p className="text-center text-gray-500">No attractions found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </div>
        )}
      </div>

      {/* ---------- FOOTER ---------- */}
      <footer className="bg-white py-4 text-center text-gray-500 text-sm">
        © 2025 SIAT Cartagena. All rights reserved.
      </footer>
    </div>
  );
}
