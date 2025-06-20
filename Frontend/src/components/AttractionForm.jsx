// Frontend/src/components/AttractionForm.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import api from '../api/axiosConfig';

const categories = ["Histórico", "Cultural", "Natural", "UNESCO Site", "Religioso"];
const significados = ["Local", "Regional", "Nacional", "Internacional"];

function LocationMarker({ position, onPositionChange }) {
    useMapEvents({
        click(e) { onPositionChange(e.latlng); },
    });
    return position ? <Marker position={position}></Marker> : null;
}

export default function AttractionForm({ initialData, onSubmit, loading, isEdit = false }) {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        categoria: 'Histórico',
        horario: '',
        ubicacion_texto: '',
        contacto: '',
        coordenadas: { lat: 10.4235, lng: -75.5494 },
        calificacion_entidad: { estadoConservacion: 0, constitucionDelBien: 0, representatividadGeneral: 0 },
        significado_entidad: 'Local',
        galeria: [], // El campo de la galería ahora empieza como un array vacío
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (isEdit && initialData) {
            setFormData({
                nombre: initialData.nombre || '',
                descripcion: initialData.descripcion || '',
                categoria: initialData.categoria || 'Histórico',
                horario: initialData.horario || '',
                ubicacion_texto: initialData.ubicacion_texto || '',
                contacto: initialData.contacto || '',
                coordenadas: initialData.coordenadas || { lat: 10.4235, lng: -75.5494 },
                calificacion_entidad: initialData.calificacion_entidad || { estadoConservacion: 0, constitucionDelBien: 0, representatividadGeneral: 0 },
                significado_entidad: initialData.significado_entidad || 'Local',
                galeria: initialData.galeria || [], // Aseguramos que galería sea un array
            });
        }
    }, [initialData, isEdit]);

    const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
    const handleRatingChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, calificacion_entidad: { ...prev.calificacion_entidad, [name]: Number(value) } })); };
    const handleMapPositionChange = (latlng) => { setFormData(prev => ({ ...prev, coordenadas: { lat: latlng.lat, lng: latlng.lng } })); };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);
        try {
            const { data } = await api.post('/upload', bodyFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setFormData(prev => ({
                ...prev,
                galeria: [...prev.galeria, data.url]
            }));
            setUploading(false);
        } catch (error) {
            console.error(error);
            alert('Error al subir la imagen.');
            setUploading(false);
        }
    };

    const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label>Nombre del Atractivo</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
                />
            </div>
            <div>
                <label>Descripción General</label>
                <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="mt-1 block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
                ></textarea>
            </div>
            <div className="border-t pt-6">
                <label className="block text-sm font-medium text-gray-700">Imágenes del Atractivo</label>
                <input
                    type="file"
                    onChange={uploadFileHandler}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {uploading && <p className="mt-2 text-sm text-gray-500 animate-pulse">Subiendo imagen...</p>}
                <div className="mt-4 grid grid-cols-3 gap-4">{formData.galeria.map((url, index) => (<div key={index}><img src={url} alt={`Vista previa ${index + 1}`} className="h-24 w-full object-cover rounded-md" /></div>))}</div>
            </div>
            <div>
                <label>Tipo / Categoría</label>
                <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
                >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label>Dirección</label>
                    <input
                        type="text"
                        name="ubicacion_texto"
                        value={formData.ubicacion_texto}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
                    />
                </div>
                <div>
                    <label>Contacto</label>
                    <input
                        type="text"
                        name="contacto"
                        value={formData.contacto}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
                    />
                </div>
                <div>
                    <label>Horarios</label>
                    <input
                        type="text"
                        name="horario"
                        value={formData.horario}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
                    />
                </div>
            </div>
            <div>
                <label>Ubicación en el Mapa (haz clic para marcar)</label>
                <div className="mt-1 h-80 rounded-lg overflow-hidden border">
                    <MapContainer
                        center={[formData.coordenadas.lat, formData.coordenadas.lng]}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <LocationMarker position={formData.coordenadas} onPositionChange={handleMapPositionChange} />
                    </MapContainer>
                </div>
            </div>
            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold">Calificación de la Entidad</h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label>Estado de Conservación (0-21)</label>
                        <input
                            type="number"
                            name="estadoConservacion"
                            min="0"
                            max="21"
                            value={formData.calificacion_entidad.estadoConservacion}
                            onChange={handleRatingChange}
                            className="mt-1 block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
                        />
                    </div>
                    <div>
                        <label>Constitución del Bien (0-21)</label>
                        <input
                            type="number"
                            name="constitucionDelBien"
                            min="0"
                            max="21"
                            value={formData.calificacion_entidad.constitucionDelBien}
                            onChange={handleRatingChange}
                            className="mt-1 block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
                        />
                    </div>
                    <div>
                        <label>Representatividad General (0-28)</label>
                        <input
                            type="number"
                            name="representatividadGeneral"
                            min="0"
                            max="28"
                            value={formData.calificacion_entidad.representatividadGeneral}
                            onChange={handleRatingChange}
                            className="mt-1 block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
                        />
                    </div>
                </div>
            </div>
            <div>
                <label>Significado</label>
                <select
                    name="significado_entidad"
                    value={formData.significado_entidad}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-black focus:border-sky-500 focus:ring-sky-500" // Modificado aquí
                >
                    {significados.map(sig => <option key={sig} value={sig}>{sig}</option>)}
                </select>
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading || uploading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                >
                    {loading || uploading ? 'Guardando...' : (isEdit ? 'Actualizar Atractivo' : 'Crear Atractivo')}
                </button>
            </div>
        </form>
    );
}