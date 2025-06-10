// Frontend/src/pages/AttractionDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from '../api/axiosConfig.js'; // Usamos la nueva config
import Navbar from "../components/Navbar";

export default function AttractionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/attractions/${id}`);
        setAttraction(data);
        setError(null);
      } catch (err) {
        setError("No se pudo encontrar la atracción.");
      } finally {
        setLoading(false);
      }
    };
    fetchAttraction();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta atracción?')) {
      try {
        await api.delete(`/attractions/${id}`);
        navigate('/places');
      } catch (err) {
        alert('No se pudo eliminar la atracción.');
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-blue-50"><Navbar /><div className="flex-grow flex items-center justify-center">Cargando...</div></div>;
  }

  if (error || !attraction) {
    return <div className="min-h-screen bg-blue-50"><Navbar /><div className="flex-grow flex items-center justify-center text-red-500">{error}</div></div>;
  }

  const customMarker = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png",
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
  });

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 font-sans">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="flex justify-between items-center">
            <button onClick={() => navigate(-1)} className="text-blue-500 hover:text-blue-700 font-medium">← Volver</button>
            {userInfo && (
              <div className="flex gap-4">
                  <Link to={`/place/${attraction._id}/edit`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">Editar</Link>
                  <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition">Eliminar</button>
              </div>
            )}
        </div>
        <h1 className="text-3xl font-semibold text-gray-800">{attraction.nombre}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attraction.galeria?.map((url, idx) => (
            <img key={idx} src={url} alt={`${attraction.nombre} ${idx + 1}`} className="w-full h-64 object-cover rounded-lg shadow-md" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Descripción</h2>
                    <p className="text-gray-700 leading-relaxed">{attraction.descripcion}</p>
                </div>
            </div>
            <div className="space-y-6">
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
            </div>
        </div>
      </div>
    </div>
  );
}