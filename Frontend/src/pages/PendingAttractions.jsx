// Frontend/src/pages/PendingAttractions.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import api from "../api/axiosConfig.js";

export default function PendingAttractions() {
  const [pendingAttractions, setPendingAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    fetchPendingAttractions();
  }, []);
  const fetchPendingAttractions = async () => {
    try {
      setLoading(true);
      
      // Debug: verificar información del usuario
      const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
      console.log('UserInfo:', userInfo);
      console.log('Is SuperAdmin:', userInfo?.isSuperAdmin);
      
      const { data } = await api.get("/attractions/pending");
      console.log('Pending attractions data:', data);
      setPendingAttractions(data);
      setError(null);
    } catch (err) {
      console.error("Error completo:", err);
      console.error("Error response:", err.response);
      setError(`Error al cargar las atracciones pendientes: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (attractionId) => {
    try {
      await api.put(`/attractions/${attractionId}/approve`);
      toast.success("Atracción aprobada exitosamente");
      fetchPendingAttractions(); // Refrescar la lista
    } catch (err) {
      toast.error("Error al aprobar la atracción");
      console.error("Error approving attraction:", err);
    }
  };

  const handleReject = async () => {
    if (!selectedAttraction || !rejectReason.trim()) {
      toast.error("Por favor, proporciona un motivo para el rechazo");
      return;
    }

    try {
      await api.put(`/attractions/${selectedAttraction._id}/reject`, {
        motivo: rejectReason
      });
      toast.success("Atracción rechazada");
      setShowRejectModal(false);
      setSelectedAttraction(null);
      setRejectReason("");
      fetchPendingAttractions(); // Refrescar la lista
    } catch (err) {
      toast.error("Error al rechazar la atracción");
      console.error("Error rejecting attraction:", err);
    }
  };

  const openRejectModal = (attraction) => {
    setSelectedAttraction(attraction);
    setShowRejectModal(true);
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setSelectedAttraction(null);
    setRejectReason("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-blue-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500">Cargando atracciones pendientes...</p>
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Atracciones Pendientes de Aprobación
        </h1>

        {pendingAttractions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">
              No hay atracciones pendientes de aprobación.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingAttractions.map((attraction) => (
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
                            {attraction.descripcion}
                          </p>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                          Pendiente
                        </span>
                      </div>                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Creado por:</p>
                          <p className="font-medium">{attraction.user?.name || 'Usuario desconocido'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fecha de creación:</p>
                          <p className="font-medium">
                            {new Date(attraction.createdAt).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Departamento:</p>
                          <p className="font-medium">{attraction.departamento || 'No especificado'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Municipio:</p>
                          <p className="font-medium">{attraction.municipio || 'No especificado'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Administrador/Propietario:</p>
                          <p className="font-medium">{attraction.administrador_propietario || 'No especificado'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Código Asignado:</p>
                          <p className="font-medium">{attraction.codigo_asignado || 'No especificado'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Ubicación:</p>
                          <p className="font-medium">{attraction.ubicacion_texto || 'No especificada'}</p>
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleApprove(attraction._id)}
                          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium"
                        >
                          ✓ Aprobar
                        </button>
                        <button
                          onClick={() => openRejectModal(attraction)}
                          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium"
                        >
                          ✗ Rechazar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de rechazo */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Rechazar Atracción
            </h3>
            <p className="text-gray-600 mb-4">
              ¿Estás seguro de que deseas rechazar "{selectedAttraction?.nombre}"?
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo del rechazo:
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="3"
                placeholder="Explica por qué se rechaza esta atracción..."
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={closeRejectModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Confirmar Rechazo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
