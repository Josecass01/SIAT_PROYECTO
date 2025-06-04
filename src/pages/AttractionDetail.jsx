// src/pages/AttractionDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AttractionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamada real:
    // axios.get(`/api/attractions/${id}`)
    //   .then(res => { setAttraction(res.data); setLoading(false) })
    //   .catch(err => console.error(err));

    // Mock de ejemplo:
    setTimeout(() => {
      const mock = {
        id,
        nombre: "Castillo San Felipe de Barajas",
        descripcion:
          "El Castillo de San Felipe de Barajas es una majestuosa fortaleza construida por los españoles en Cartagena. Con túneles subterráneos, murallas imponentes y vistas panorámicas al mar Caribe, esta edificación resistió múltiples ataques piratas y hoy es Patrimonio Histórico.",
        tipo: "HISTÓRICO",
        imagenUrl:
          "https://images.unsplash.com/photo-1595209986516-1c5c7f76f2ce?auto=format&fit=crop&w=800&q=80",
        horario: "Lun–Dom: 8:00 AM – 6:00 PM",
        ubicacion: "Av. Venezuela con Calle 30, Cartagena",
        contacto: "+57 300 1234567",
        galeria: [
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&w=500&q=80"
        ]
      };
      setAttraction(mock);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-siat-gray">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-gray-500">
          Cargando información…
        </div>
      </div>
    );
  }

  if (!attraction) {
    return (
      <div className="flex flex-col min-h-screen bg-siat-gray">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-red-500">
          Atractivo no encontrado
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-siat-gray font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-siat-blue hover:text-blue-600 mb-4 font-medium"
        >
          ← Volver
        </button>

        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          {attraction.nombre}
        </h1>

        <img
          src={attraction.imagenUrl}
          alt={attraction.nombre}
          className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
        />

        <p className="text-gray-700 mb-6 leading-relaxed">
          {attraction.descripcion}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-1">
              Tipo
            </h2>
            <p className="text-gray-600">{attraction.tipo}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-1">
              Horario
            </h2>
            <p className="text-gray-600">{attraction.horario}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-1">
              Ubicación
            </h2>
            <p className="text-gray-600">{attraction.ubicacion}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-1">
              Contacto
            </h2>
            <p className="text-gray-600">{attraction.contacto}</p>
          </div>
        </div>

        {attraction.galeria && attraction.galeria.length > 0 && (
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              Galería
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {attraction.galeria.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`${attraction.nombre} ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-sm"
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <footer className="bg-white py-4">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
          © 2025 SIAT Cartagena. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
