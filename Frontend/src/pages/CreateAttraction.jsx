// Frontend/src/pages/CreateAttraction.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import Navbar from '../components/Navbar';
import AttractionForm from '../components/AttractionForm';

export default function CreateAttraction() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post('/attractions', formData);
            setLoading(false);
            alert('¡Atracción creada exitosamente!');
            navigate(`/place/${data._id}`);
        } catch (err) {
            setLoading(false);
            setError('No se pudo crear la atracción. Revisa los datos.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6">Crear Nuevo Atractivo Turístico</h1>
                {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
                <AttractionForm 
                    onSubmit={handleSubmit} 
                    loading={loading} 
                />
            </div>
        </div>
    );
}