// backend/src/controllers/attractionController.js
import Attraction from '../models/Attraction.js';
import asyncHandler from 'express-async-handler'; // Asegúrate de que esta dependencia esté instalada (npm install express-async-handler)

// --- CRUD DE ATRACCIONES ---

const getAllAttractions = asyncHandler(async (req, res) => {
  try {
    let filter = {};
    
    // Si el usuario no es SuperAdmin, solo mostrar atracciones aprobadas
    if (!req.user || !req.user.isSuperAdmin) {
      filter.estado = "aprobada";
    }
    
    const attractions = await Attraction.find(filter).populate('user', 'name');
    res.json(attractions);
  } catch (error) { 
    res.status(500).json({ message: 'Error del servidor' }); 
  }
});

const getAttractionById = asyncHandler(async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id).populate('reviews.user', 'name');
    if (attraction) { res.json(attraction); } else { res.status(404).json({ message: 'Atracción no encontrada' }); }
  } catch (error) { res.status(500).json({ message: 'Error del servidor' }); }
});

const createAttraction = asyncHandler(async (req, res) => {
  try {
    const { 
      nombre, 
      descripcion, 
      categoria, 
      departamento,
      municipio,
      administrador_propietario,
      codigo_asignado,
      ubicacion_texto, 
      coordenadas, 
      calificacion_entidad, 
      significado_entidad, 
      galeria 
    } = req.body;
    
    const newAttraction = new Attraction({
      nombre, 
      descripcion, 
      categoria, 
      departamento,
      municipio,
      administrador_propietario,
      codigo_asignado,
      ubicacion_texto, 
      coordenadas, 
      calificacion_entidad, 
      significado_entidad, 
      galeria,
      user: req.user._id // MUY IMPORTANTE: Asociamos la atracción con el usuario que la crea
    });
    const createdAttraction = await newAttraction.save();
    res.status(201).json(createdAttraction);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Datos inválidos' });
  }
});

const updateAttraction = asyncHandler(async (req, res) => {
  try {
    const { 
      nombre, 
      descripcion, 
      categoria, 
      departamento,
      municipio,
      administrador_propietario,
      codigo_asignado,
      ubicacion_texto, 
      coordenadas, 
      calificacion_entidad, 
      significado_entidad, 
      galeria 
    } = req.body;
    
    const attraction = await Attraction.findById(req.params.id);

    if (attraction) {
      // --- ¡LÓGICA DE PERMISOS MEJORADA! ---
      // Comprueba si el usuario es el dueño de la atracción O si es un SuperAdmin.
      if (attraction.user.toString() !== req.user._id.toString() && !req.user.isSuperAdmin) {
        return res.status(403).json({ message: 'No tienes permiso para editar esta atracción.' });
      }      attraction.nombre = nombre;
      attraction.descripcion = descripcion;
      attraction.categoria = categoria;
      attraction.departamento = departamento;
      attraction.municipio = municipio;
      attraction.administrador_propietario = administrador_propietario;
      attraction.codigo_asignado = codigo_asignado;
      attraction.ubicacion_texto = ubicacion_texto;
      attraction.coordenadas = coordenadas;
      attraction.calificacion_entidad = calificacion_entidad;
      attraction.significado_entidad = significado_entidad;
      attraction.galeria = galeria;
      
      const updatedAttraction = await attraction.save();
      res.json(updatedAttraction);
    } else { 
      res.status(404).json({ message: 'Atracción no encontrada' }); 
    }
  } catch (error) { 
    console.error("Error en updateAttraction:", error);
    res.status(500).json({ message: 'Error del servidor' }); 
  }
});

const deleteAttraction = asyncHandler(async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    if (attraction) {
      // --- ¡LÓGICA DE PERMISOS MEJORADA! ---
      if (attraction.user.toString() !== req.user._id.toString() && !req.user.isSuperAdmin) {
        return res.status(403).json({ message: 'No tienes permiso para eliminar esta atracción.' });
      }
      
      await attraction.deleteOne();
      res.json({ message: 'Atracción eliminada' });
    } else { res.status(404).json({ message: 'Atracción no encontrada' }); }
  } catch (error) { res.status(500).json({ message: 'Error del servidor' }); }
});


// --- MANEJO DE RESEÑAS ---

const createAttractionReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const attraction = await Attraction.findById(req.params.id);
    if (attraction) {
        const alreadyReviewed = attraction.reviews.find((r) => r.user.toString() === req.user._id.toString());
        if (alreadyReviewed) { return res.status(400).json({ message: 'Ya has hecho una reseña para esta atracción' }); }
        const review = { name: req.user.name, rating: Number(rating), comment, user: req.user._id };
        attraction.reviews.push(review);
        attraction.numReviews = attraction.reviews.length;
        attraction.rating = attraction.reviews.reduce((acc, item) => item.rating + acc, 0) / attraction.reviews.length;
        await attraction.save();
        res.status(201).json({ message: 'Reseña añadida' });
    } else { res.status(404).json({ message: 'Atracción no encontrada' }); }
});

const updateAttractionReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const attraction = await Attraction.findById(req.params.id);
    if (attraction) {
        const review = attraction.reviews.find((r) => r.user.toString() === req.user._id.toString());
        if (review) {
            review.rating = rating;
            review.comment = comment;
            attraction.rating = attraction.reviews.reduce((acc, item) => item.rating + acc, 0) / attraction.reviews.length;
            await attraction.save();
            res.status(200).json({ message: 'Reseña actualizada' });
        } else { res.status(404).json({ message: 'Reseña no encontrada' }); }
    } else { res.status(404).json({ message: 'Atracción no encontrada' }); }
});

const deleteAttractionReview = asyncHandler(async (req, res) => {
    const attraction = await Attraction.findById(req.params.id);
    if (attraction) {
        const review = attraction.reviews.find((r) => r._id.toString() === req.params.reviewId.toString());
        if (!review) { return res.status(404).json({ message: 'Reseña no encontrada' }); }
        if (review.user.toString() !== req.user._id.toString() && !req.user.isSuperAdmin) { return res.status(403).json({ message: 'No tienes permiso para eliminar esta reseña' }); }
        attraction.reviews = attraction.reviews.filter((r) => r._id.toString() !== req.params.reviewId.toString());
        attraction.numReviews = attraction.reviews.length;
        if (attraction.numReviews > 0) { attraction.rating = attraction.reviews.reduce((acc, item) => item.rating + acc, 0) / attraction.reviews.length; } else { attraction.rating = 0; }
        await attraction.save();
        res.status(200).json({ message: 'Reseña eliminada' });
    } else { res.status(404).json({ message: 'Atracción no encontrada' }); }
});

// **NUEVA FUNCIÓN PARA LA PÁGINA PRINCIPAL**
// @desc    Obtener atractivos para la página principal (sugeridos y para el carrusel)
// @route   GET /api/attractions/public/home
// @access  Public
const getAttractionsForHome = asyncHandler(async (req, res) => {
    try {
        // Obtener los atractivos con las calificaciones (de usuarios) más altas
        // Ordenamos por 'rating' de forma descendente y luego por 'numReviews' para desempatar.        // Solo mostrar atracciones aprobadas
        const suggestedAttractions = await Attraction.find({ estado: "aprobada" })
            .sort({ rating: -1, numReviews: -1 }) // Ordenar de mayor a menor calificación
            .limit(6); // Obtener los 6 atractivos mejor calificados

        // Obtener atractivos para las imágenes del carrusel.
        // Seleccionamos atractivos que tengan al menos una imagen en su campo 'galeria' y estén aprobados.
        const carouselAttractions = await Attraction.find({
            'galeria.0': { $exists: true }, // Verifica que el array 'galeria' no esté vacío
            estado: "aprobada" // Solo atracciones aprobadas
        })
            .sort({ createdAt: -1 }) // Ordenar por los más recientes (puedes cambiar a rating: -1 si quieres los mejor calificados en el carrusel)
            .limit(3); // Obtener 3 atractivos para el carrusel

        // Formateamos los datos del carrusel para el frontend
        const carouselItems = carouselAttractions.map(attraction => {
            return {
                url: attraction.galeria[0], // Usamos la primera imagen del array 'galeria'
                attractionId: attraction._id, // Necesitamos el ID para navegar
                attractionName: attraction.nombre // El nombre para mostrar
            };
        });

        // Enviamos los datos al frontend
        res.json({
            suggestedAttractions,
            carouselItems
        });
    } catch (error) {
        console.error("Error en getAttractionsForHome:", error);
        res.status(500).json({ message: 'Error del servidor al obtener datos del home' });
    }
});

// --- FUNCIONES PARA SISTEMA DE APROBACIÓN ---

// Obtener atracciones pendientes de aprobación (solo SuperAdmin)
const getPendingAttractions = asyncHandler(async (req, res) => {
  try {
    console.log('getPendingAttractions - Usuario:', req.user?.name, 'isSuperAdmin:', req.user?.isSuperAdmin);
    
    const attractions = await Attraction.find({ estado: "pendiente" })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    console.log('Atracciones pendientes encontradas:', attractions.length);
    res.json(attractions);
  } catch (error) {
    console.error('Error en getPendingAttractions:', error);
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});

// Aprobar una atracción (solo SuperAdmin)
const approveAttraction = asyncHandler(async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    
    if (!attraction) {
      return res.status(404).json({ message: 'Atracción no encontrada' });
    }
    
    if (attraction.estado !== "pendiente") {
      return res.status(400).json({ message: 'Esta atracción ya ha sido procesada' });
    }
    
    attraction.estado = "aprobada";
    attraction.fechaAprobacion = new Date();
    attraction.aprobadaPor = req.user._id;
    
    const updatedAttraction = await attraction.save();
    res.json(updatedAttraction);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Rechazar una atracción (solo SuperAdmin)
const rejectAttraction = asyncHandler(async (req, res) => {
  try {
    const { motivo } = req.body;
    const attraction = await Attraction.findById(req.params.id);
    
    if (!attraction) {
      return res.status(404).json({ message: 'Atracción no encontrada' });
    }
    
    if (attraction.estado !== "pendiente") {
      return res.status(400).json({ message: 'Esta atracción ya ha sido procesada' });
    }
    
    attraction.estado = "rechazada";
    attraction.motivoRechazo = motivo || "No especificado";
    attraction.aprobadaPor = req.user._id;
    
    const updatedAttraction = await attraction.save();
    res.json(updatedAttraction);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Obtener atracciones del usuario actual (incluyendo pendientes y rechazadas)
const getMyAttractions = asyncHandler(async (req, res) => {
  try {
    const attractions = await Attraction.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});


export {
    getAllAttractions,
    getAttractionById,
    createAttraction,
    updateAttraction,
    deleteAttraction,
    createAttractionReview,
    updateAttractionReview,
    deleteAttractionReview,
    getAttractionsForHome,
    // Nuevas funciones de aprobación
    getPendingAttractions,
    approveAttraction,
    rejectAttraction,
    getMyAttractions
};