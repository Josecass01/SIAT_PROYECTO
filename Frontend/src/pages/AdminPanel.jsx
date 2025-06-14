// Frontend/src/pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import Navbar from '../components/Navbar';

export default function AdminPanel() {
    const [codes, setCodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCodes = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/codes');
            setCodes(data);
            setError(null);
        } catch (err) {
            setError('No se pudieron cargar los códigos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCodes();
    }, []);

    const handleGenerateCode = async () => {
        try {
            await api.post('/codes');
            fetchCodes(); // Refresca la lista de códigos después de crear uno nuevo
        } catch (err) {
            alert('No se pudo generar el código.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Códigos de Invitación</h2>
                        <button 
                            onClick={handleGenerateCode}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Generar Nuevo Código
                        </button>
                    </div>

                    {loading && <p>Cargando códigos...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-4 text-left">Código</th>
                                    <th className="py-2 px-4 text-left">Estado</th>
                                    <th className="py-2 px-4 text-left">Usado por</th>
                                </tr>
                            </thead>
                            <tbody>
                                {codes.map(code => (
                                    <tr key={code._id} className="border-b">
                                        <td className="py-2 px-4 font-mono">{code.code}</td>
                                        <td className="py-2 px-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${code.isUsed ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                                                {code.isUsed ? 'Usado' : 'Disponible'}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4">{code.user?.name || '---'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}