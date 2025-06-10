// Frontend/src/pages/Places.jsx

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import SortDropdown from "../components/SortDropdown";
import AttractionCard from "../components/AttractionCard";
import axios from "axios"; // <-- 1. Importamos axios

// YA NO NECESITAMOS MOCK DATA, LA BORRAMOS
// const mockAttractions = [ ... ];

export default function Places() {
  // --- NUEVOS ESTADOS ---
  const [allAttractions, setAllAttractions] = useState([]); // Almacenará TODAS las atracciones de la API
  const [loading, setLoading] = useState(true); // Para mostrar un mensaje de carga
  const [error, setError] = useState(null); // Para mostrar un mensaje de error

  // --- ESTADOS QUE YA TENÍAS ---
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("highest");

  const categories = [
    "All", "Historical", "Cultural", "Natural", "UNESCO Site", "Religious",
  ];

  // --- NUEVO USEEFFECT PARA OBTENER DATOS DE LA API ---
  // Este useEffect se ejecuta solo una vez, cuando el componente se monta.
  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        setLoading(true); // Empezamos a cargar
        // Hacemos la petición GET a nuestro backend
        const response = await axios.get("http://localhost:4000/api/attractions");
        setAllAttractions(response.data); // Guardamos los datos en el estado
        setError(null); // Limpiamos cualquier error anterior
      } catch (err) {
        setError("No se pudieron cargar las atracciones. Inténtalo de nuevo más tarde.");
        console.error(err);
      } finally {
        setLoading(false); // Terminamos de cargar (ya sea con éxito o error)
      }
    };

    fetchAttractions();
  }, []); // El array vacío [] asegura que se ejecute solo una vez

  // --- USEEFFECT MODIFICADO PARA FILTRAR Y ORDENAR ---
  // Este se ejecuta cada vez que cambian los datos de la API o los filtros.
  useEffect(() => {
    let temp = [...allAttractions]; // Empezamos con los datos de la API

    // Filtrado por texto
    if (searchText) {
        temp = temp.filter((a) =>
            a.nombre.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    // Filtrado por categoría
    if (activeCategory !== "All") {
      temp = temp.filter((a) => a.categoria === activeCategory);
    }

    // Ordenamiento (usamos 'rating_usuario' que viene de la API)
    if (sortOption === "highest") {
      temp.sort((a, b) => (b.rating_usuario || 0) - (a.rating_usuario || 0));
    } else if (sortOption === "lowest") {
      temp.sort((a, b) => (a.rating_usuario || 0) - (b.rating_usuario || 0));
    } else if (sortOption === "alphabetical") {
      temp.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    setFilteredAttractions(temp);
  }, [searchText, activeCategory, sortOption, allAttractions]);


  // --- RENDERIZADO CONDICIONAL ---
  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-500">Cargando lugares...</p>;
    }

    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }
    
    if (filteredAttractions.length === 0) {
      return <p className="text-center text-gray-500">No se encontraron resultados.</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAttractions.map((attraction) => (
          // OJO: Cambiamos 'attraction.id' por 'attraction._id' que es lo que genera MongoDB
          // Y pasamos el objeto 'attraction' completo al componente hijo
          <AttractionCard key={attraction._id} attraction={attraction} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />
      <div className="mt-6" />
      <div className="bg-white shadow-md rounded-lg mx-4 lg:mx-8 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-shrink-0">
            <FilterBar
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
          <div className="flex-grow lg:flex-none lg:w-1/4">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
            />
          </div>
          <div className="flex-shrink-0">
            <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 my-6 mx-4 lg:mx-8" />
      <div className="flex-grow max-w-6xl mx-auto px-4 lg:px-8 py-2">
        {renderContent()}
      </div>
      <footer className="bg-white py-4 text-center text-gray-500 text-sm">
        © 2025 SIAT Cartagena. All rights reserved.
      </footer>
    </div>
  );
}