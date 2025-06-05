// src/components/SortDropdown.jsx
import React from "react";

export default function SortDropdown({ sortOption, setSortOption }) {
  return (
    <div>
      <label htmlFor="sort" className="text-gray-700 font-medium mr-2">
        Sort by:
      </label>
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option value="highest">Highest Rated</option>
        <option value="lowest">Lowest Rated</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    </div>
  );
}
