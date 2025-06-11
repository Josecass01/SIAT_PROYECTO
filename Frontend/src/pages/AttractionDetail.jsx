// Frontend/src/pages/AttractionDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from '../api/axiosConfig.js';
import Navbar from "../components/Navbar";

// Componente auxiliar para mostrar estrellas
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

export default function AttractionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState('');
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  const fetchAttraction = async () => { try { setLoading(true); const { data } = await api.get(`/attractions/${id}`); setAttraction(data); setError(null); } catch (err) { setError("No se pudo encontrar la atracción."); } finally { setLoading(false); } };
  useEffect(() => { fetchAttraction(); }, [id]);
  const handleDelete = async () => { if (window.confirm('¿Estás seguro?')) { try { await api.delete(`/attractions/${id}`); navigate('/places'); } catch (err) { alert('No se pudo eliminar.'); } } };
  const handleReviewSubmit = async (e) => { e.preventDefault(); setReviewLoading(true); setReviewError(null); try { await api.post(`/attractions/${id}/reviews`, { rating, comment }); setReviewLoading(false); setRating(0); setComment(''); fetchAttraction(); } catch (err) { setReviewError(err.response?.data?.message || 'Error al enviar reseña.'); setReviewLoading(false); } };
  const handleEditClick = (review) => { setEditingReviewId(review._id); setEditRating(review.rating); setEditComment(review.comment); };
  const handleCancelEdit = () => { setEditingReviewId(null); };
  const handleUpdateReviewSubmit = async (e) => { e.preventDefault(); try { await api.put(`/attractions/${id}/reviews`, { rating: editRating, comment: editComment }); setEditingReviewId(null); fetchAttraction(); } catch (error) { alert('No se pudo actualizar la reseña.'); } };

  if (loading) return <div className="min-h-screen bg-blue-50"><Navbar /><div className="flex-grow flex items-center justify-center text-gray-500">Cargando...</div></div>;
  if (error || !attraction) return <div className="min-h-screen bg-blue-50"><Navbar /><div className="flex-grow flex items-center justify-center text-red-500">{error || "Atracción no encontrada"}</div></div>;

  const alreadyReviewed = userInfo ? attraction.reviews?.some(r => r.user === userInfo._id) : false;
  const customMarker = new L.Icon({ iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png", shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png", iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 font-sans">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div>
          <div className="flex justify-between items-center">
            <button onClick={() => navigate(-1)} className="text-blue-500 hover:text-blue-700 font-medium">← Volver</button>
            {userInfo && userInfo.isEntity && (
              <div className="flex gap-4"><Link to={`/place/${attraction._id}/edit`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">Editar</Link><button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition">Eliminar</button></div>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mt-4">{attraction.nombre}</h1>
          <div className="flex items-center gap-2 mt-2"><Rating value={attraction.rating} /><span className="text-gray-600">({attraction.numReviews} reseñas)</span></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">{attraction.galeria?.map((url, idx) => (<img key={idx} src={url} alt={`${attraction.nombre} ${idx + 1}`} className="w-full h-64 object-cover rounded-lg shadow-md" />))}</div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6"><h2 className="text-2xl font-semibold text-gray-800 mb-4">Descripción General</h2><p className="text-gray-700 leading-relaxed">{attraction.descripcion}</p></div>
            <div className="bg-white rounded-lg shadow p-6"><div className="grid grid-cols-2 gap-4"><h3 className="text-sm font-medium text-gray-500 col-span-2 border-b pb-2 mb-2">Detalles Adicionales</h3><div><h4 className="font-semibold">Tipo</h4><p>{attraction.categoria}</p></div><div><h4 className="font-semibold">Horario</h4><p>{attraction.horario}</p></div><div><h4 className="font-semibold">Ubicación</h4><p>{attraction.ubicacion_texto}</p></div><div><h4 className="font-semibold">Contacto</h4><p>{attraction.contacto}</p></div></div></div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden h-full"><h2 className="text-xl font-semibold text-gray-800 p-6">Ubicación en el Mapa</h2><div className="h-80"><MapContainer center={[attraction.coordenadas.lat, attraction.coordenadas.lng]} zoom={14} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}><TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><Marker position={[attraction.coordenadas.lat, attraction.coordenadas.lng]} icon={customMarker}><Popup>{attraction.nombre}</Popup></Marker></MapContainer></div></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reseñas de Usuarios</h2>
          {attraction.reviews?.length === 0 && <p className="text-gray-600">No hay reseñas todavía. ¡Sé el primero!</p>}
          <div className="space-y-6 mt-4">
            {attraction.reviews?.map(review => (
              <div key={review._id} className="border-t pt-4">
                {editingReviewId === review._id ? (
                  <form onSubmit={handleUpdateReviewSubmit} className="space-y-2"><div><label className="block text-sm font-medium">Tu Calificación</label><Rating value={editRating} onClick={setEditRating} isInteractive={true} /></div><div><label className="block text-sm font-medium">Tu Comentario</label><textarea value={editComment} onChange={(e) => setEditComment(e.target.value)} rows="3" className="w-full p-2 border rounded-md"></textarea></div><div className="flex gap-2"><button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Guardar</button><button type="button" onClick={handleCancelEdit} className="px-4 py-2 bg-gray-300 rounded text-sm">Cancelar</button></div></form>
                ) : (
                  <div><div className="flex justify-between items-center"><strong>{review.name}</strong>{userInfo && userInfo._id === review.user && (<button onClick={() => handleEditClick(review)} className="text-sm text-blue-600 hover:underline">Editar</button>)}</div><Rating value={review.rating} /><p className="text-xs text-gray-500 mt-1">{new Date(review.createdAt).toLocaleDateString()}</p><p className="mt-2 text-gray-700">{review.comment}</p></div>
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
    </div>
  );
}