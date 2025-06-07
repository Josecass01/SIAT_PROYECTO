// backend/src/controllers/attractionController.js
import Attraction from '../models/Attraction.js';

// --- FUNCIÓN PARA OBTENER TODAS ---
const getAllAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find({});
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// --- FUNCIÓN PARA CREAR UNA ---
const createAttraction = async (req, res) => {
  try {
    const { nombre, descripcion, categoria, coordenadas, galeria } = req.body;
    const newAttraction = new Attraction({
      nombre,
      descripcion,
      categoria,
      coordenadas,
      galeria,
    });
    const createdAttraction = await newAttraction.save();
    res.status(201).json(createdAttraction);
  } catch (error) {
    res.status(400).json({ message: 'Datos inválidos', error: error.message });
  }
};

// --- FUNCIÓN PARA OBTENER POR ID ---
const getAttractionById = async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    if (attraction) {
      res.json(attraction);
    } else {
      res.status(404).json({ message: 'Atracción no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// --- LA LÍNEA MÁS IMPORTANTE ---
// Asegúrate de que estamos exportando las TRES funciones.
export { getAllAttractions, createAttraction, getAttractionById };