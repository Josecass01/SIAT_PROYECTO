// backend/src/routes/attractionRoutes.js
import express from 'express';
// Importamos ambas funciones desde el controlador
import {
  getAllAttractions,
  createAttraction,
} from '../controllers/attractionController.js';

const router = express.Router();

// La ruta raíz '/' puede manejar GET (para obtener todos) y POST (para crear uno nuevo)
router.route('/').get(getAllAttractions).post(createAttraction);

export default router;