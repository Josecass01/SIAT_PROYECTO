// backend/src/controllers/attractionController.js
import Attraction from '../models/Attraction.js';

// ... (la función getAllAttractions que ya teníamos sigue aquí)
const getAllAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find({});
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// @desc    Crear una nueva atracción
// @route   POST /api/attractions
// @access  Private (eventualmente)
const createAttraction = async (req, res) => {
  try {
    // Obtenemos los datos del cuerpo de la petición
    const { nombre, descripcion, categoria, coordenadas, galeria } = req.body;

    // Creamos una nueva instancia del modelo
    const newAttraction = new Attraction({
      nombre,
      descripcion,
      categoria,
      coordenadas, // esperamos un objeto { lat, lng }
      galeria, // esperamos un array de strings (URLs)
    });

    // Guardamos en la base de datos
    const createdAttraction = await newAttraction.save();

    // Respondemos con la nueva atracción creada y un estado 201 (Created)
    res.status(201).json(createdAttraction);
  } catch (error) {
    res.status(400).json({ message: 'Datos inválidos', error: error.message });
  }
};

// Exportamos ambas funciones
export { getAllAttractions, createAttraction };