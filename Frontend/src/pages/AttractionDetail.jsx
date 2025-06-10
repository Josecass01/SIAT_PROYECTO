// Frontend/src/pages/AttractionDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import Navbar from "../components/Navbar";

// Esta función auxiliar la puedes mantener si planeas usarla.
// Calcula porcentaje global de experto sobre 70 puntos (21+21+28)
function calculateExpertPercent(scores) {
  if (!scores) return 0;
  const maxTotal = 21 + 21 + 28; // =70
  const sum =
    scores.estadoConservacion +
    scores.constitucionDelBien +
    scores.representatividadGeneral;
  return Math.round((sum / maxTotal) * 100);
}

export default function AttractionDetail() {
  const { id } = useParams(); // Obtiene el :id de la URL
  const navigate = useNavigate();

  // Estados para manejar los datos, la carga y los errores
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para obtener los datos de la atracción de la API
  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/api/attractions/${id}`);
        setAttraction(response.data);
        setError(null);
      } catch (err) {
        setError("No se pudo encontrar la atracción.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttraction();
  }, [id]); // Se ejecuta cada vez que el ID de la URL cambia

  // Función para manejar la eliminación
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta atracción? Esta acción no se puede deshacer.')) {
      try {
        await axios.delete(`http://localhost:4000/api/attractions/${id}`);
        navigate('/places');
      } catch (err) {
        console.error('Error al eliminar la atracción:', err);
        alert('No se pudo eliminar la atracción. Inténtalo de nuevo.');
      }
    }
  };


  // --- RENDERIZADO CONDICIONAL ---
  // Muestra un mensaje mientras se cargan los datos
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-blue-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-gray-500">Cargando información…</div>
      </div>
    );
  }

  // Muestra un mensaje de error si la carga falla o si no se encuentra la atracción
  if (error || !attraction) {
    return (
      <div className="flex flex-col min-h-screen bg-blue-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-red-500">{error || "Atractivo no encontrado"}</div>
      </div>
    );
  }

  // Si llegamos aquí, es seguro renderizar el componente con los datos de 'attraction'

  const expertPercent = calculateExpertPercent(attraction.calificacion_entidad);
  
  // Icono personalizado para el mapa de Leaflet
  const customMarker = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png",
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 font-sans">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="flex justify-between items-center">
            <button onClick={() => navigate(-1)} className="text-blue-500 hover:text-blue-700 font-medium">← Volver</button>
            <div className="flex gap-4">
                {/* Botón para Editar */}
                <Link
                    to={`/place/${attraction._id}/edit`}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
                >
                    Editar
                </Link>
                {/* Botón para Eliminar */}
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
                >
                    Eliminar
                </button>
            </div>
        </div>
        
        <h1 className="text-3xl font-semibold text-gray-800">{attraction.nombre}</h1>
        
        {/* GALERÍA DE FOTOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attraction.galeria?.map((url, idx) => (
            <img key={idx} src={url} alt={`${attraction.nombre} ${idx + 1}`} className="w-full h-64 object-cover rounded-lg shadow-md" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* COLUMNA IZQUIERDA: DESCRIPCIÓN, CALIFICACIÓN USUARIOS, INFO, COMENTARIOS */}
          <div className="lg:col-span-2 space-y-6">
            {/* DESCRIPCIÓN */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Descripción</h2>
              <p className="text-gray-700 leading-relaxed">{attraction.descripcion}</p>
            </div>

            {/* DATOS ADICIONALES */}
            <div className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-800 mb-1">Tipo</h3>
                <p className="text-gray-600">{attraction.categoria}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800 mb-1">Horario</h3>
                <p className="text-gray-600">{attraction.horario}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800 mb-1">Ubicación</h3>
                <p className="text-gray-600">{attraction.ubicacion_texto}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800 mb-1">Contacto</h3>
                <p className="text-gray-600">{attraction.contacto}</p>
              </div>
            </div>

            {/* COMENTARIOS DE USUARIOS */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Comentarios</h2>
              {attraction.comentarios?.map((c, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <p className="text-gray-800 font-medium">{c.usuario}</p>
                  <p className="text-gray-700">{c.texto}</p>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMNA DERECHA: MAPA + CALIFICACIÓN EXPERTO */}
          <div className="space-y-6">
            {/* MAPA */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <h2 className="px-4 py-2 font-semibold text-gray-800">Ubicación</h2>
              <div className="h-64">
                <MapContainer center={[attraction.coordenadas.lat, attraction.coordenadas.lng]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[attraction.coordenadas.lat, attraction.coordenadas.lng]} icon={customMarker}>
                    <Popup>{attraction.nombre}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* CALIFICACIÓN EXPERTO (si decides usarla) */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Calificación de la Entidad</h2>
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-700">Total</p>
                <span className="text-lg font-bold text-gray-900">{expertPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-6">
                <div className="h-2 bg-blue-500" style={{ width: `${expertPercent}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}