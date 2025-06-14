// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";    // <-- Muy importante: así Tailwind entra en React
import App from "./App";
import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
