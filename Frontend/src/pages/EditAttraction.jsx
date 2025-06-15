// Frontend/src/pages/EditAttraction.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    }, [id]);

    const handleSubmit = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            await api.put(`/attractions/${id}`, formData);
            setLoading(false);
            alert('¡Atracción actualizada exitosamente!');
            navigate(`/place/${id}`);
        } catch (err) {
            setLoading(false);
            setError('No se pudo actualizar la atracción.');
            console.error(err);
        }
    };

    if (loading) return <div className="min-h-screen bg-gray-100"><Navbar /><p className="text-center mt-10">Cargando datos para editar...</p></div>;
    if (error) return <div className="min-h-screen bg-gray-100"><Navbar /><p className="text-center mt-10 text-red-500">{error}</p></div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6">Editando: {initialData?.nombre}</h1>
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