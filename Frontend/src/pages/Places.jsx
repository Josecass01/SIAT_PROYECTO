// Frontend/src/pages/Places.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import SortDropdown from "../components/SortDropdown";
import AttractionCard from "../components/AttractionCard";
import api from "../api/axiosConfig.js"; // Usamos la nueva config

export default function Places() {
  const [allAttractions, setAllAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("highest");

  const categories = ["All", "Historical", "Cultural", "Natural", "UNESCO Site", "Religious"];

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/attractions");
        setAllAttractions(data);
        setError(null);
      } catch (err) {
        setError("No se pudieron cargar las atracciones.");
      } finally {
        setLoading(false);
      }
    };
    fetchAttractions();
  }, []);

  useEffect(() => {
    let temp = [...allAttractions];
    if (searchText) {
        temp = temp.filter((a) =>
            a.nombre.toLowerCase().includes(searchText.toLowerCase())
        );
    }
    if (activeCategory !== "All") {
      temp = temp.filter((a) => a.categoria === activeCategory);
    }
    if (sortOption === "highest") {
      temp.sort((a, b) => (b.rating_usuario || 0) - (a.rating_usuario || 0));
    } else if (sortOption === "lowest") {
      temp.sort((a, b) => (a.rating_usuario || 0) - (b.rating_usuario || 0));
    } else if (sortOption === "alphabetical") {
      temp.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
    setFilteredAttractions(temp);
  }, [searchText, activeCategory, sortOption, allAttractions]);

  const renderContent = () => {
    if (loading) return <p className="text-center text-gray-500">Cargando lugares...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (filteredAttractions.length === 0) return <p className="text-center text-gray-500">No se encontraron resultados.</p>;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAttractions.map((attraction) => (
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
          <FilterBar categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full lg:w-1/4 px-3 py-2 border border-gray-300 rounded-md"
          />
          <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
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