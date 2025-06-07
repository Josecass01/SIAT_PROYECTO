// src/pages/AttractionDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Navbar from "../components/Navbar";

// ----------------------------------------------
// MOCK DATA LOCAL: reemplaza o amplía con tus
// propios registros para que funcione en local
// ----------------------------------------------
const localAttractions = [
  {
    id: "1",
    nombre: "Castillo San Felipe de Barajas",
    descripcion:
      "El Castillo de San Felipe de Barajas es una majestuosa fortaleza construida por los españoles en Cartagena. Con túneles subterráneos, murallas imponentes y vistas panorámicas al mar Caribe, esta edificación resistió múltiples ataques piratas y hoy es Patrimonio Histórico.",
    tipo: "HISTÓRICO",
    horario: "Lun–Dom: 8:00 AM – 6:00 PM",
    ubicacion: "Av. Venezuela con Calle 30, Cartagena",
    contacto: "+57 300 1234567",
    galeria: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1573844325007-862c78256ecb?auto=format&fit=crop&w=500&q=80"
    ],
    userRating: 4.8,
    userViews: 2500,
    expertScores: {
      estadoConservacion: 21,
      constitucionDelBien: 14,
      representatividadGeneral: 28
    },
    expertSignificado: "Regional",
    comentarios: [
      { id: "a", usuario: "María", texto: "¡Impresionante visita, muy recomendada!" },
      { id: "b", usuario: "Carlos", texto: "La historia y las vistas son espectaculares." }
    ],
    location: {
      lat: 10.422,
      lng: -75.545
    }
  },
  {
    id: "2",
    nombre: "Playa de Bocagrande",
    descripcion:
      "Playa Bocagrande es famosa por su arena dorada y sus aguas cristalinas. Ideal para un día de sol, deportes acuáticos y disfrutar de la brisa caribeña.",
    tipo: "PLAYA",
    horario: "Lun–Dom: 6:00 AM – 7:00 PM",
    ubicacion: "Bocagrande, Cartagena",
    contacto: "+57 310 7654321",
    galeria: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=500&q=80"
    ],
    userRating: 4.5,
    userViews: 1800,
    expertScores: {
      estadoConservacion: 18,
      constitucionDelBien: 16,
      representatividadGeneral: 24
    },
    expertSignificado: "Local",
    comentarios: [
      { id: "c", usuario: "Laura", texto: "El mar está tranquilo y el ambiente es muy agradable." }
    ],
    location: {
      lat: 10.399,
      lng: -75.514
    }
  }
];
// ----------------------------------------------------------

// Calcula porcentaje global de experto sobre 70 puntos (21+21+28)
function calculateExpertPercent(scores) {
  const maxTotal = 21 + 21 + 28; // =70
  const sum =
    scores.estadoConservacion +
    scores.constitucionDelBien +
    scores.representatividadGeneral;
  return Math.round((sum / maxTotal) * 100);
}

export default function AttractionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Para trabajar de forma local, buscamos en el arreglo localAttractions:
    const found = localAttractions.find((item) => item.id === id);
    setAttraction(found || null);
    setLoading(false);

    // Si quisieras hacer un llamado real a la base de datos:
    // axios.get(`/api/attractions/${id}`)
    //   .then(res => { setAttraction(res.data); setLoading(false); })
    //   .catch(err => { console.error(err); setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-blue-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-gray-500">
          Cargando información…
        </div>
      </div>
    );
  }

  if (!attraction) {
    return (
      <div className="flex flex-col min-h-screen bg-blue-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-red-500">
          Atractivo no encontrado
        </div>
      </div>
    );
  }

  // Cálculos de calificación de experto
  const expertPercent = calculateExpertPercent(attraction.expertScores);
  const pctEstado = Math.round(
    (attraction.expertScores.estadoConservacion / 21) * 100
  );
  const pctConstitucion = Math.round(
    (attraction.expertScores.constitucionDelBien / 21) * 100
  );
  const pctRepresentatividad = Math.round(
    (attraction.expertScores.representatividadGeneral / 28) * 100
  );

  // Icono personalizado Leaflet
  const customMarker = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png",
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Renderizado dinámico de estrellas según userRating
  const renderUserStars = () =>
    Array.from({ length: 5 }).map((_, i) => {
      const fillPercentage = Math.min(
        Math.max((attraction.userRating - i) * 100, 0),
        100
      );
      return (
        <div key={i} className="relative w-5 h-5 mr-1">
          <svg
            viewBox="0 0 20 20"
            className="w-5 h-5 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="10 1.5 12.59 7.6 19.3 7.6 13.85 11.9 16.44 18 10 13.7 3.56 18 6.15 11.9 0.7 7.6 7.41 7.6"
              fill="currentColor"
            />
          </svg>
          {fillPercentage > 0 && (
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <svg
                viewBox="0 0 20 20"
                className="w-5 h-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  points="10 1.5 12.59 7.6 19.3 7.6 13.85 11.9 16.44 18 10 13.7 3.56 18 6.15 11.9 0.7 7.6 7.41 7.6"
                  fill="currentColor"
                />
              </svg>
            </div>
          )}
        </div>
      );
    });

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          ← Volver
        </button>

        {/* NOMBRE DEL ATRACTIVO */}
        <h1 className="text-3xl font-semibold text-gray-800">
          {attraction.nombre}
        </h1>

        {/* GALERÍA DE FOTOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attraction.galeria.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`${attraction.nombre} ${idx + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* COLUMNA IZQUIERDA: DESCRIPCIÓN, CALIFICACIÓN USUARIOS, INFO, COMENTARIOS */}
          <div className="lg:col-span-2 space-y-6">
            {/* CALIFICACIÓN DE USUARIOS */}
            <div className="flex items-center">
              {renderUserStars()}
              <span className="ml-2 text-gray-600 font-medium">
                {attraction.userRating.toFixed(1)} ({attraction.userViews} vistas)
              </span>
            </div>

            {/* DESCRIPCIÓN */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Descripción
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {attraction.descripcion}
              </p>
            </div>

            {/* DATOS ADICIONALES */}
            <div className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-800 mb-1">
                  Tipo
                </h3>
                <p className="text-gray-600">{attraction.tipo}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800 mb-1">
                  Horario
                </h3>
                <p className="text-gray-600">{attraction.horario}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800 mb-1">
                  Ubicación
                </h3>
                <p className="text-gray-600">{attraction.ubicacion}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800 mb-1">
                  Contacto
                </h3>
                <p className="text-gray-600">{attraction.contacto}</p>
              </div>
            </div>

            {/* COMENTARIOS DE USUARIOS */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Comentarios
              </h2>
              {attraction.comentarios.map((c) => (
                <div key={c.id} className="mb-4 last:mb-0">
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
                <MapContainer
                  center={[attraction.location.lat, attraction.location.lng]}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[attraction.location.lat, attraction.location.lng]}
                    icon={customMarker}
                  >
                    <Popup>{attraction.nombre}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* CALIFICACIÓN EXPERTO */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Calificación de la Entidad
              </h2>

              {/* Porcentaje global */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-700">Total</p>
                <span className="text-lg font-bold text-gray-900">
                  {expertPercent}%
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-6">
                <div
                  className="h-2 bg-blue-500"
                  style={{ width: `${expertPercent}%` }}
                ></div>
              </div>

              {/* Sub-puntuaciones */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">Estructura</p>
                  <span className="text-sm font-medium text-blue-600">
                    {pctEstado}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">Mantenimiento</p>
                  <span className="text-sm font-medium text-blue-600">
                    {pctConstitucion}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">Accesibilidad</p>
                  <span className="text-sm font-medium text-blue-600">
                    {pctRepresentatividad}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
