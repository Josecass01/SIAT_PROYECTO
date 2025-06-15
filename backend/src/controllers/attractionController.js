// backend/src/controllers/attractionController.js
import Attraction from '../models/Attraction.js';

// --- CRUD DE ATRACCIONES ---

const getAllAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find({}).populate('user', 'name');
    res.json(attractions);
  } catch (error) { res.status(500).json({ message: 'Error del servidor' }); }
};

const getAttractionById = async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id).populate('reviews.user', 'name');
    if (attraction) { res.json(attraction); } else { res.status(404).json({ message: 'Atracción no encontrada' }); }
  } catch (error) { res.status(500).json({ message: 'Error del servidor' }); }
};

const createAttraction = async (req, res) => {
  try {
    const { nombre, descripcion, categoria, horario, ubicacion_texto, contacto, coordenadas, calificacion_entidad, significado_entidad, galeria } = req.body;
    const newAttraction = new Attraction({
      nombre, descripcion, categoria, horario, ubicacion_texto, contacto, 
      coordenadas, calificacion_entidad, significado_entidad, galeria,
      user: req.user._id // MUY IMPORTANTE: Asociamos la atracción con el usuario que la crea
    });
    const createdAttraction = await newAttraction.save();
    res.status(201).json(createdAttraction);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Datos inválidos' });
  }
};

const updateAttraction = async (req, res) => {
  try {
    const { nombre, descripcion, categoria, horario, ubicacion_texto, contacto, coordenadas, calificacion_entidad, significado_entidad, galeria } = req.body;
    const attraction = await Attraction.findById(req.params.id);

    if (attraction) {
      // --- ¡LÓGICA DE PERMISOS MEJORADA! ---
      // Comprueba si el usuario es el dueño de la atracción O si es un SuperAdmin.
      if (attraction.user.toString() !== req.user._id.toString() && !req.user.isSuperAdmin) {
        return res.status(403).json({ message: 'No tienes permiso para editar esta atracción.' });
      }

      attraction.nombre = nombre;
      attraction.descripcion = descripcion;
      attraction.categoria = categoria;
      attraction.horario = horario;
      attraction.ubicacion_texto = ubicacion_texto;
      attraction.contacto = contacto;
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
};

const deleteAttraction = async (req, res) => {
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
};


// --- MANEJO DE RESEÑAS ---

const createAttractionReview = async (req, res) => {
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
};

const updateAttractionReview = async (req, res) => {
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
};

const deleteAttractionReview = async (req, res) => {
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
};

export { getAllAttractions, getAttractionById, createAttraction, updateAttraction, deleteAttraction, createAttractionReview, updateAttractionReview, deleteAttractionReview };