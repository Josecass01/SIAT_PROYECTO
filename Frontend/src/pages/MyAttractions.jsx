// Frontend/src/pages/MyAttractions.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axiosConfig.js";

export default function MyAttractions() {
  const [myAttractions, setMyAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyAttractions();
  }, []);

  const fetchMyAttractions = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/attractions/my/attractions");
      setMyAttractions(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar tus atracciones.");
      console.error("Error fetching my attractions:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (estado) => {
    switch (estado) {
      case "aprobada":
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Aprobada</span>;
      case "pendiente":
        return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Pendiente</span>;
      case "rechazada":
        return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">Rechazada</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">Desconocido</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-blue-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500">Cargando tus atracciones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-blue-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />
      
      <div className="flex-grow max-w-6xl mx-auto px-4 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Mis Atracciones
          </h1>
          <Link
            to="/create-attraction"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            + Crear Nueva Atracción
          </Link>
        </div>

        {myAttractions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg mb-4">
              No has creado ninguna atracción aún.
            </p>
            <Link
              to="/create-attraction"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Crear Mi Primera Atracción
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {myAttractions.map((attraction) => (
              <div key={attraction._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Imagen */}
                    <div className="flex-shrink-0">
                      <img
                        src={attraction.galeria?.[0] || 'https://via.placeholder.com/300x200'}
                        alt={attraction.nombre}
                        className="w-full lg:w-64 h-48 object-cover rounded-lg"
                      />
                    </div>

                    {/* Información */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {attraction.nombre}
                          </h2>
                          <p className="text-blue-600 font-medium mb-2">
                            {attraction.categoria}
                          </p>
                          <p className="text-gray-600 mb-4">
                            {attraction.descripcion.length > 150 
                              ? attraction.descripcion.substring(0, 150) + "..."
                              : attraction.descripcion
                            }
                          </p>
                        </div>
                        {getStatusBadge(attraction.estado)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Fecha de creación:</p>
                          <p className="font-medium">
                            {new Date(attraction.createdAt).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Última actualización:</p>
                          <p className="font-medium">
                            {new Date(attraction.updatedAt).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                        {attraction.fechaAprobacion && (
                          <div>
                            <p className="text-sm text-gray-500">Fecha de aprobación:</p>
                            <p className="font-medium">
                              {new Date(attraction.fechaAprobacion).toLocaleDateString('es-ES')}
                            </p>
                          </div>
                        )}
                        {attraction.estado === "rechazada" && attraction.motivoRechazo && (
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-500">Motivo del rechazo:</p>
                            <p className="font-medium text-red-600">{attraction.motivoRechazo}</p>
                          </div>
                        )}
                      </div>

                      {/* Botones de acción */}
                      <div className="flex gap-4">
                        {attraction.estado === "aprobada" && (
                          <Link
                            to={`/place/${attraction._id}`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                          >
                            Ver Público
                          </Link>
                        )}
                        
                        {(attraction.estado === "pendiente" || attraction.estado === "rechazada") && (
                          <Link
                            to={`/place/${attraction._id}/edit`}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                          >
                            Editar
                          </Link>
                        )}
                        
                        {attraction.estado === "aprobada" && (
                          <Link
                            to={`/place/${attraction._id}/edit`}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                          >
                            Actualizar
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
