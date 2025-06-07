// Frontend/src/pages/EditAttraction.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function EditAttraction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/attractions/${id}`);
        setFormData({
          nombre: data.nombre,
          descripcion: data.descripcion,
          categoria: data.categoria,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar la atracción', error);
        alert('No se pudo cargar la información para editar.');
      }
    };
    fetchAttraction();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/attractions/${id}`, formData);
      navigate(`/place/${id}`); // Redirige al detalle tras guardar
    } catch (error) {
      console.error('Error al actualizar la atracción', error);
      alert('No se pudieron guardar los cambios.');
    }
  };

  if (loading) {
    return <div>Cargando formulario...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Editar Atracción</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              name="descripcion"
              id="descripcion"
              rows="4"
              value={formData.descripcion}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoría</label>
            <input
              type="text"
              name="categoria"
              id="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={() => navigate(`/place/${id}`)} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}