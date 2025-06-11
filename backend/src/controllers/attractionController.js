// backend/src/controllers/attractionController.js
import Attraction from '../models/Attraction.js';

const getAllAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find({});
    res.json(attractions);
  } catch (error) { res.status(500).json({ message: 'Error del servidor' }); }
};

const getAttractionById = async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    if (attraction) { res.json(attraction); } else { res.status(404).json({ message: 'Atracción no encontrada' }); }
  } catch (error) { res.status(500).json({ message: 'Error del servidor' }); }
};

const createAttraction = async (req, res) => {
  try {
    const { nombre, descripcion, categoria, coordenadas, galeria } = req.body;
    const newAttraction = new Attraction({ nombre, descripcion, categoria, coordenadas, galeria, user: req.user._id });
    const createdAttraction = await newAttraction.save();
    res.status(201).json(createdAttraction);
  } catch (error) { res.status(400).json({ message: 'Datos inválidos' }); }
};

const updateAttraction = async (req, res) => {
  try {
    const { nombre, descripcion, categoria, galeria, coordenadas } = req.body;
    const attraction = await Attraction.findById(req.params.id);
    if (attraction) {
      attraction.nombre = nombre || attraction.nombre;
      attraction.descripcion = descripcion || attraction.descripcion;
      attraction.categoria = categoria || attraction.categoria;
      attraction.galeria = galeria || attraction.galeria;
      attraction.coordenadas = coordenadas || attraction.coordenadas;
      const updatedAttraction = await attraction.save();
      res.json(updatedAttraction);
    } else { res.status(404).json({ message: 'Atracción no encontrada' }); }
  } catch (error) { res.status(500).json({ message: 'Error del servidor' }); }
};

const deleteAttraction = async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    if (attraction) {
      await attraction.deleteOne();
      res.json({ message: 'Atracción eliminada' });
    } else { res.status(404).json({ message: 'Atracción no encontrada' }); }
  } catch (error) { res.status(500).json({ message: 'Error del servidor' }); }
};

const createAttractionReview = async (req, res) => {
    const { rating, comment } = req.body;
    const attraction = await Attraction.findById(req.params.id);
    if (attraction) {
        const alreadyReviewed = attraction.reviews.find((r) => r.user.toString() === req.user._id.toString());
        if (alreadyReviewed) {
            res.status(400).json({ message: 'Ya has hecho una reseña para esta atracción' });
            return;
        }
        const review = { name: req.user.name, rating: Number(rating), comment, user: req.user._id };
        attraction.reviews.push(review);
        attraction.numReviews = attraction.reviews.length;
        attraction.rating = attraction.reviews.reduce((acc, item) => item.rating + acc, 0) / attraction.reviews.length;
        await attraction.save();
        res.status(201).json({ message: 'Reseña añadida' });
    } else {
        res.status(404).json({ message: 'Atracción no encontrada' });
    }
};
// Añade esta función a tu controlador
const updateAttractionReview = async (req, res) => {
    const { rating, comment } = req.body;
    const attraction = await Attraction.findById(req.params.id);

    if (attraction) {
        const review = attraction.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (review) {
            review.rating = rating || review.rating;
            review.comment = comment || review.comment;

            // Recalculamos el promedio general
            attraction.rating =
                attraction.reviews.reduce((acc, item) => item.rating + acc, 0) /
                attraction.reviews.length;

            await attraction.save();
            res.status(200).json({ message: 'Reseña actualizada' });
        } else {
            res.status(404);
            throw new Error('Reseña no encontrada');
        }
    } else {
        res.status(404);
        throw new Error('Atracción no encontrada');
    }
};

export { getAllAttractions, getAttractionById, createAttraction, updateAttraction, deleteAttraction, createAttractionReview, updateAttractionReview };