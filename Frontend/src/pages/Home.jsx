// Frontend/src/pages/Home.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axiosConfig'; // Asegúrate de que esta ruta sea correcta
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import AttractionCard from "../components/AttractionCard";
import CopyrightFooter from "../components/CopyrightFooter";
// Si tienes un componente Footer y quieres usarlo, impórtalo aquí:
// import Footer from "../components/Footer";

export default function Home() {
  const [suggestedAttractions, setSuggestedAttractions] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Mantenemos la llamada a tu endpoint existente '/attractions/public/home'.
        // Este endpoint debe devolver tanto 'suggestedAttractions' como 'carouselItems'.
        const response = await axios.get('/attractions/public/home'); //

        // Lógica para los atractivos sugeridos (los 3 mejor calificados)
        const allSuggestedAttractions = response.data.suggestedAttractions || []; //
        const topRatedAttractions = allSuggestedAttractions
          .sort((a, b) => (b.rating || 0) - (a.rating || 0)) // Ordena por rating descendente
          .slice(0, 3); // Toma solo los 3 primeros

        setSuggestedAttractions(topRatedAttractions);

        // Lógica para el carrusel: Usamos directamente los items que el backend nos envíe para el carrusel.
        // No aplicamos ordenamiento o limitación aquí, ya que el backend debería encargarse de lo que se muestra en el carrusel.
        setCarouselItems(response.data.carouselItems || []); //

      } catch (err) {
        setError('Error al cargar los datos de la página principal. Por favor, asegúrate de que el backend esté funcionando correctamente y accesible.'); //
        console.error('Error al intentar obtener datos del home:', err); //
        if (err.response) {
          console.error('Datos de error del servidor:', err.response.data); //
          console.error('Estado del error del servidor:', err.response.status); //
          console.error('Encabezados del error del servidor:', err.response.headers); //
        } else if (err.request) {
          console.error('No se recibió respuesta del servidor. Posiblemente CORS o backend caído.'); //
        } else {
          console.error('Error en la configuración de la solicitud:', err.message); //
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []); //

  const handleAttractionClick = (id) => {
    navigate(`/place/${id}`); //
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-blue-50">
        <p className="text-xl text-blue-700">Cargando atractivos turísticos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-blue-50">
        <p className="text-xl text-red-700">{error}</p>
        <p className="text-lg text-red-600 mt-4 font-semibold">
          Pasos a seguir para depurar:
        </p>
        <ul className="list-disc list-inside text-gray-700 text-base mt-2">
          <li>Abre la consola de tu navegador (F12) en la pestaña "Console" y "Network".</li>
          <li>Busca las solicitudes a 'http://localhost:4000/api/attractions/public/home'.</li>
          <li>Revisa el código de estado (debe ser 200) y cualquier mensaje de error que aparezca.</li>
          <li>Asegúrate de que tu **backend esté corriendo en el puerto 4000** y sin errores en su terminal.</li>
          <li>Confirma que en `backend/src/server.js`, la configuración de CORS permite el origen de tu frontend (ej. `http://localhost:5173` o `http://localhost:3000`).</li>
        </ul>
      </div>
    );
  }

  return (
    // Contenedor principal de la aplicación.
    <div className="min-h-screen flex flex-col">
      {/* Navbar - Con su propio fondo blanco y sombra */}
      <Navbar />

      {/* Línea divisoria directamente después del Navbar */}
      <div className="border-b border-gray-200 my-0" /> {/* */}

      {/* Contenido principal de la página con el fondo azul claro */}
      <main className="flex-grow bg-blue-50 py-8"> {/* */}

        {/* Sección del Carrusel */}
        <section className="mb-8"> {/* */}
          <div className="max-w-5xl mx-auto px-4">
            {carouselItems.length > 0 ? (
              <Carousel items={carouselItems} onItemClick={handleAttractionClick} />
            ) : (
              <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
                No hay imágenes disponibles para el carrusel.
              </div>
            )}
          </div>
        </section>

        {/* Atractivos Mejor Calificados */}
        <section className="max-w-5xl mx-auto px-4 py-2"> {/* */}
          <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-10">
            Atractivos Mejor Calificados
          </h2>
          {suggestedAttractions.length > 0 ? (
            // Configuración de la cuadrícula con gap para el espaciado
            // y 'lg:grid-cols-3' para asegurar 3 columnas en pantallas grandes.
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8">
              {suggestedAttractions.map((attraction) => (
                <AttractionCard key={attraction._id} attraction={attraction} onClick={handleAttractionClick} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">No hay atractivos sugeridos para mostrar en este momento.</p>
          )}        </section>

        {/* Footer con información de copyright */}
        <CopyrightFooter />
      </main>
    </div>
  );
}