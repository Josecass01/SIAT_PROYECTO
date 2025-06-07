// src/components/FilterBar.jsx
import React from "react";

export default function FilterBar({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-gray-700 font-medium mr-2">Filter by:</span>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            activeCategory === cat
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
