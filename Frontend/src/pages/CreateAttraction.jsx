// Frontend/src/pages/CreateAttraction.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../api/axiosConfig';
import Navbar from '../components/Navbar';
import AttractionForm from '../components/AttractionForm';
import CopyrightFooter from '../components/CopyrightFooter';

export default function CreateAttraction() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);    const handleSubmit = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post('/attractions', formData);
            setLoading(false);
            toast.success('¡Atracción creada exitosamente! Está pendiente de aprobación.');
            navigate('/my-attractions');
        } catch (err) {
            setLoading(false);
            setError('No se pudo crear la atracción. Revisa los datos.');
            toast.error('Error al crear la atracción');            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-4">Crear Nuevo Atractivo Turístico</h1>
                
                {/* Información sobre la aprobación */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                <strong>Importante:</strong> Las nuevas atracciones deben ser aprobadas por el super administrador antes de ser públicas. 
                                Puedes ver el estado de tus atracciones en la sección "Mis Atracciones".
                            </p>
                        </div>
                    </div>
                </div>
                
                {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
                <AttractionForm 
                    onSubmit={handleSubmit} 
                    loading={loading} 
                />
            </div>
            <CopyrightFooter />
        </div>
    );
}