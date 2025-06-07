// backend/src/controllers/attractionController.js
import Attraction from '../models/Attraction.js';

// --- 1. FUNCIÓN PARA OBTENER TODAS ---
const getAllAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find({});
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// --- 2. FUNCIÓN PARA CREAR UNA ---
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

// --- 3. FUNCIÓN PARA OBTENER POR ID ---
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

// --- 4. FUNCIÓN PARA ELIMINAR ---
const deleteAttraction = async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);

    if (attraction) {
      await attraction.deleteOne();
      res.json({ message: 'Atracción eliminada exitosamente' });
    } else {
      res.status(404).json({ message: 'Atracción no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// --- 5. FUNCIÓN PARA ACTUALIZAR ---
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
    } else {
      res.status(404).json({ message: 'Atracción no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};


// EXPORTAMOS LAS 5 FUNCIONES
export {
  getAllAttractions,
  createAttraction,
  getAttractionById,
  deleteAttraction,
  updateAttraction,
};