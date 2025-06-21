// Frontend/src/pages/AttractionDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from '../api/axiosConfig.js';
import Navbar from "../components/Navbar";
import CopyrightFooter from "../components/CopyrightFooter";

// Componente auxiliar para mostrar estrellas (sin cambios en este)
const Rating = ({ value, onClick, isInteractive = false }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <span key={i} onClick={() => isInteractive && onClick(i + 1)} className={isInteractive ? 'cursor-pointer' : ''}>
                    <svg className={`w-5 h-5 ${value > i ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.956c.3.921-.755 1.688-1.54 1.118l-3.368-2.446a1 1 0 00-1.175 0l-3.368 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.956a1 1 0 00-.364-1.118L2.05 9.389c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" /></svg>
                </span>
            ))}
        </div>
    );
};

// Componente para Barra de Progreso (para calificación de entidad) - ¡MODIFICADO AQUÍ!
const ProgressBar = ({ label, value, max, textValue = null }) => {
    const percentage = (value / max) * 100;
    // La clase de color de la barra sigue dependiendo del porcentaje
    const colorClass = percentage > 75 ? 'bg-green-500' : percentage > 50 ? 'bg-yellow-500' : 'bg-red-500';
    return (
        <div>
            <h4 className="font-semibold text-gray-600 mb-1">{label}</h4>
            <div className="w-full bg-gray-200 rounded-full h-4 relative">
                <div className={`${colorClass} h-4 rounded-full`} style={{ width: `${percentage}%` }}></div>
                {/* MODIFICADO: El texto ahora tiene un color oscuro y una sombra */}
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-gray-900 text-shadow-sm"> {/* text-gray-900 o text-black para contraste */}
                    {textValue ? `${textValue} (${value}/${max})` : `${value}/${max}`}
                </span>
            </div>
        </div>
    );
};

export default function AttractionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(null);  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
  

  const fetchAttraction = async () => { try { setLoading(true); const { data } = await api.get(`/attractions/${id}`); setAttraction(data); setError(null); } catch (err) { setError("No se pudo encontrar la atracción."); console.error("Error fetching attraction details:", err); } finally { setLoading(false); } };
  useEffect(() => { fetchAttraction(); }, [id]);

  const handleDelete = async () => { if (window.confirm('¿Estás seguro de que quieres eliminar esta atracción?')) { try { await api.delete(`/attractions/${id}`); navigate('/places'); } catch (err) { alert('No se pudo eliminar la atracción.'); console.error("Error deleting attraction:", err); } } };
  const handleReviewSubmit = async (e) => { e.preventDefault(); setReviewLoading(true); setReviewError(null); try { await api.post(`/attractions/${id}/reviews`, { rating, comment }); setReviewLoading(false); setRating(0); setComment(''); alert('¡Reseña enviada con éxito!'); fetchAttraction(); } catch (err) { setReviewError(err.response?.data?.message || 'Error al enviar reseña.'); setReviewLoading(false); console.error("Error submitting review:", err); } };
  const handleEditClick = (review) => { setEditingReviewId(review._id); setEditRating(review.rating); setEditComment(review.comment); };
  const handleCancelEdit = () => { setEditingReviewId(null); };
  const handleUpdateReviewSubmit = async (e) => { e.preventDefault(); try { await api.put(`/attractions/${id}/reviews`, { rating: editRating, comment: editComment }); setEditingReviewId(null); fetchAttraction(); } catch (error) { alert('No se pudo actualizar la reseña.'); console.error("Error updating review:", error); } };
  const handleDeleteReview = async (reviewId) => { if (window.confirm('¿Estás seguro de que quieres eliminar esta reseña?')) { try { await api.delete(`/attractions/${id}/reviews/${reviewId}`); fetchAttraction(); } catch (error) { alert('No se pudo eliminar la reseña.'); console.error("Error deleting review:", error); } } };

  if (loading) return <div className="min-h-screen bg-blue-50"><Navbar /><div className="flex-grow flex items-center justify-center text-gray-500">Cargando...</div></div>;
  if (error || !attraction) return <div className="min-h-screen bg-blue-50"><Navbar /><div className="flex-grow flex items-center justify-center text-red-500">{error || "Atracción no encontrada"}</div></div>;

  const alreadyReviewed = userInfo ? attraction.reviews?.some(r => r.user === userInfo._id) : false;
  const customMarker = new L.Icon({ iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png", shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png", iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });

  // LÓGICA DE PERMISOS PARA GESTIONAR LA ATRACCIÓN
  const canManageAttraction = userInfo && (userInfo.isSuperAdmin || (attraction.user && attraction.user === userInfo._id));

  // Lógica para convertir significado_entidad a un valor numérico para la barra de progreso
  const getSignificadoValueForProgressBar = (significado) => {
    switch (significado) {
        case 'Local': return 6; // 6 puntos para Local
        case 'Regional': return 12; // 12 puntos para Regional
        case 'Nacional': return 18; // 18 puntos para Nacional
        case 'Internacional': return 30; // 30 puntos para Internacional
        default: return 0;
    }
  };

  // Valores de las calificaciones de la entidad
  const estadoConservacionVal = attraction.calificacion_entidad?.estadoConservacion || 0;
  const constitucionDelBienVal = attraction.calificacion_entidad?.constitucionDelBien || 0;
  const representatividadGeneralVal = attraction.calificacion_entidad?.representatividadGeneral || 0;
  const significadoEntidadValForProgressBar = getSignificadoValueForProgressBar(attraction.significado_entidad);

  // Calcular la calificación total de la entidad sobre un máximo de 100
  const maxTotalEntityScore = 21 + 21 + 28 + 30; // Suma de los máximos individuales para llegar a 100 (70 + 30 = 100)
  const currentTotalEntityScore = estadoConservacionVal + constitucionDelBienVal + representatividadGeneralVal + significadoEntidadValForProgressBar;

  // El puntaje total ya está sobre 100, no se necesita escalar más
  const finalEntityTotal = Math.round(Math.min(Math.max(0, currentTotalEntityScore), 100)); // Redondeado a entero y entre 0-100

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 font-sans">
      <Navbar />
      {/* Contenedor principal del contenido, limitado en ancho */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 flex-grow">
        <div>
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => navigate(-1)} className="text-blue-500 hover:text-blue-700 font-medium">← Volver</button>
            {canManageAttraction && (
              <div className="flex gap-4">
                <Link to={`/place/${attraction._id}/edit`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">Editar</Link>
                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition">Eliminar</button>
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mt-0">{attraction.nombre}</h1>
          <div className="flex items-center gap-2 mt-2"><Rating value={attraction.rating} /><span className="text-gray-600">({attraction.numReviews} reseñas)</span></div>          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {attraction.galeria?.map((url, idx) => (
                    <img 
                        key={idx} 
                        src={url} 
                        alt={`${attraction.nombre} ${idx + 1}`} 
                        className="w-full h-64 object-cover rounded-lg shadow-md cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out" 
                        onClick={() => setSelectedImage(url)}
                    />
                ))}
            </div>
        </div>

        {/* Sección de Descripción General - AHORA ABARCA TODO EL ANCHO (sin grilla lateral) */}
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Descripción General</h2>
            <p className="text-gray-700 leading-relaxed">{attraction.descripcion}</p>
        </div>

        {/* Estructura de 2 Columnas para Detalles/Ubicación/Reseñas (izquierda) y Mapa/Calificación Entidad (derecha) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> {/* Grilla de 3 columnas para proporciones 2/3 y 1/3 */}
          {/* Columna Izquierda: Detalles y Reseñas. Ocupa 2/3 en pantallas grandes */}
          <div className="lg:col-span-2 space-y-6"> {/* lg:col-span-2 para un ancho mayor */}            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Detalles y Ubicación</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div><h4 className="font-semibold text-gray-600">Tipo</h4><p>{attraction.categoria}</p></div>
                <div><h4 className="font-semibold text-gray-600">Departamento</h4><p>{attraction.departamento || 'No especificado'}</p></div>
                <div><h4 className="font-semibold text-gray-600">Municipio</h4><p>{attraction.municipio || 'No especificado'}</p></div>
                <div><h4 className="font-semibold text-gray-600">Código Asignado</h4><p>{attraction.codigo_asignado || 'No especificado'}</p></div>
                <div className="sm:col-span-2"><h4 className="font-semibold text-gray-600">Dirección</h4><p>{attraction.ubicacion_texto || 'No especificada'}</p></div>
                <div className="sm:col-span-2"><h4 className="font-semibold text-gray-600">Administrador/Propietario</h4><p>{attraction.administrador_propietario || 'No especificado'}</p></div>
              </div>
            </div>

            {/* Reseñas de Usuarios - MANTENIDO AQUÍ, debajo de Detalles y Ubicación, en la misma columna izquierda */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reseñas de Usuarios</h2>
                {attraction.reviews?.length === 0 && <p className="text-gray-600">No hay reseñas todavía. ¡Sé el primero!</p>}
                <div className="space-y-6 mt-4">
                    {attraction.reviews?.map(review => (
                        <div key={review._id} className="border-t pt-4">
                            {editingReviewId === review._id ? (
                                <form onSubmit={handleUpdateReviewSubmit} className="space-y-2">
                                    <div>
                                        <label className="block text-sm font-medium">Tu Calificación</label>
                                        <Rating value={editRating} onClick={setEditRating} isInteractive={true} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Tu Comentario</label>
                                        <textarea value={editComment} onChange={(e) => setEditComment(e.target.value)} rows="3" className="w-full p-2 border rounded-md"></textarea>
                                    </div>
                                    <div className="flex gap-2">
                                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Guardar</button>
                                        <button type="button" onClick={handleCancelEdit} className="px-4 py-2 bg-gray-300 rounded text-sm">Cancelar</button>
                                    </div>
                                </form>
                            ) : (
                                <div>
                                    <div className="flex justify-between items-center">
                                        <strong>{review.name}</strong>
                                        <div className="flex items-center gap-4">
                                            {userInfo && userInfo._id === review.user && (<button onClick={() => handleEditClick(review)} className="text-sm text-blue-600 hover:underline">Editar</button>)}
                                            {userInfo && (userInfo._id === review.user || userInfo.isSuperAdmin) && (<button onClick={() => handleDeleteReview(review._id)} className="text-sm text-red-600 hover:underline">Eliminar</button>)}
                                        </div>
                                    </div>
                                    <Rating value={review.rating} />
                                    <p className="text-xs text-gray-500 mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
                                    <p className="mt-2 text-gray-700">{review.comment}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-8 border-t pt-6">
                    <h3 className="text-xl font-semibold">Escribe tu propia reseña</h3>
                    {userInfo && !userInfo.isEntity ? ( alreadyReviewed ? (<div className="p-3 bg-blue-100 text-blue-800 rounded-md mt-4">Ya has enviado una reseña para este lugar.</div>) : (
                        <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
                            <div><label>Calificación</label><select value={rating} onChange={(e) => setRating(e.target.value)} required className="w-full p-2 border rounded-md"><option value="">Selecciona...</option><option value="1">1 - Malo</option><option value="2">2 - Regular</option><option value="3">3 - Bueno</option><option value="4">4 - Muy Bueno</option><option value="5">5 - Excelente</option></select></div>
                            <div><label>Comentario</label><textarea rows="3" value={comment} onChange={(e) => setComment(e.target.value)} required className="w-full p-2 border rounded-md"></textarea></div>
                            {reviewError && <p className="text-red-500">{reviewError}</p>}
                            <button type="submit" disabled={reviewLoading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300">{reviewLoading ? 'Enviando...' : 'Enviar Reseña'}</button>
                        </form>
                    )) : (<div className="p-3 bg-gray-100 text-gray-800 rounded-md mt-4">{userInfo && userInfo.isEntity ? 'Las entidades no pueden dejar reseñas.' : <>Por favor, <Link to="/login" className="text-blue-600 hover:underline">inicia sesión</Link> para escribir una reseña.</>}</div>)
                    }
                </div>
            </div>
          </div>
          
          {/* Columna Derecha: Contenedor para Mapa y Calificación de la Entidad */}
          <div className="space-y-6"> {/* Esta columna ahora ocupa 1/3 del espacio en pantallas grandes */}
            {/* Contenedor del Mapa - Más cuadrado */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <h2 className="text-xl font-semibold text-gray-800 p-6">Ubicación en el Mapa</h2>
              <div className="w-full h-80 sm:h-96 lg:h-auto lg:aspect-square">
                    {attraction.coordenadas?.lat && attraction.coordenadas?.lng ? ( 
                        <MapContainer 
                            center={[attraction.coordenadas.lat, attraction.coordenadas.lng]} 
                            zoom={14} 
                            scrollWheelZoom={false} 
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker 
                                position={[attraction.coordenadas.lat, attraction.coordenadas.lng]} 
                                icon={customMarker}
                            >
                                <Popup>{attraction.nombre}</Popup>
                            </Marker>
                        </MapContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Coordenadas del mapa no disponibles.
                        </div>
                    )}
                </div>
            </div>

            {/* Calificación de la Entidad - Debajo del mapa, en la misma columna derecha */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Calificación de la Entidad</h3>
              <div className="space-y-4">
                <ProgressBar 
                    label="Estado de Conservación" 
                    value={estadoConservacionVal} 
                    max={21} 
                />
                <ProgressBar 
                    label="Constitución del Bien" 
                    value={constitucionDelBienVal} 
                    max={21} 
                />
                <ProgressBar 
                    label="Representatividad General" 
                    value={representatividadGeneralVal} 
                    max={28} 
                />
                {/* Significado de la Entidad como barra de progreso con el texto del valor */}
                <ProgressBar 
                    label="Significado de la Entidad" 
                    value={significadoEntidadValForProgressBar} 
                    max={30} 
                    textValue={attraction.significado_entidad || 'No especificado'} 
                />
                
                {/* CALIFICACIÓN TOTAL DE LA ENTIDAD - VISUALIZACIÓN DIFERENTE Y EN ENTERO */}
                <div className="mt-6 p-4 bg-blue-100 text-blue-800 rounded-lg text-center font-bold text-lg shadow-inner">
                    <p>Calificación Total Entidad:</p>
                    {/* Muestra el valor entero */}
                    <p className="text-3xl mt-1">{finalEntityTotal} / 100</p> 
                </div>          </div>
        </div>
      </div>

      {/* Modal para imagen ampliada */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedImage} 
              alt="Imagen ampliada" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold transition-all duration-200"
            >
              ×
            </button>
          </div>        </div>
      )}
    </div>
      </div>
      <CopyrightFooter />
    </div>
  );
}