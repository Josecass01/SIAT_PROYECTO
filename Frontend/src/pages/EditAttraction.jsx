// Frontend/src/pages/EditAttraction.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../api/axiosConfig';
import Navbar from '../components/Navbar';
import AttractionForm from '../components/AttractionForm';

export default function EditAttraction() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttraction = async () => {
            try {
                const { data } = await api.get(`/attractions/${id}`);
                setInitialData(data);
                setLoading(false);
            } catch (err) {
                setError('No se pudo cargar la atracción para editar.');
                setLoading(false);
            }
        };
        fetchAttraction();
    }, [id]);    const handleSubmit = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            await api.put(`/attractions/${id}`, formData);
            setLoading(false);
            toast.success('¡Atracción actualizada exitosamente!');
            navigate('/my-attractions');
        } catch (err) {
            setLoading(false);
            setError('No se pudo actualizar la atracción.');
            toast.error('Error al actualizar la atracción');
            console.error(err);
        }
    };

    if (loading) return <div className="min-h-screen bg-gray-100"><Navbar /><p className="text-center mt-10">Cargando datos para editar...</p></div>;
    if (error) return <div className="min-h-screen bg-gray-100"><Navbar /><p className="text-center mt-10 text-red-500">{error}</p></div>;

    return (        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-4">Editando: {initialData?.nombre}</h1>
                
                {/* Mostrar estado actual */}
                {initialData?.estado && (
                    <div className={`p-4 mb-6 rounded-lg ${
                        initialData.estado === 'aprobada' ? 'bg-green-50 border-l-4 border-green-400' :
                        initialData.estado === 'pendiente' ? 'bg-yellow-50 border-l-4 border-yellow-400' :
                        'bg-red-50 border-l-4 border-red-400'
                    }`}>
                        <div className="flex">
                            <div className="flex-shrink-0">
                                {initialData.estado === 'aprobada' ? (
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : initialData.estado === 'pendiente' ? (
                                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <div className="ml-3">
                                <p className={`text-sm ${
                                    initialData.estado === 'aprobada' ? 'text-green-700' :
                                    initialData.estado === 'pendiente' ? 'text-yellow-700' :
                                    'text-red-700'
                                }`}>
                                    <strong>Estado actual:</strong> {
                                        initialData.estado === 'aprobada' ? 'Aprobada' :
                                        initialData.estado === 'pendiente' ? 'Pendiente de aprobación' :
                                        'Rechazada'
                                    }
                                    {initialData.estado === 'rechazada' && initialData.motivoRechazo && (
                                        <span> - Motivo: {initialData.motivoRechazo}</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                
                <AttractionForm 
                    initialData={initialData}
                    onSubmit={handleSubmit} 
                    loading={loading}
                    isEdit={true} 
                />
            </div>
        </div>
    );
}