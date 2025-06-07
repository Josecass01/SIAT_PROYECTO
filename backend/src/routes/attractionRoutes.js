// backend/src/routes/attractionRoutes.js
import express from 'express';
import {
  getAllAttractions,
  createAttraction,
  getAttractionById,
} from '../controllers/attractionController.js';

const router = express.Router();

// La ruta raíz (/) maneja GET para obtener todo y POST para crear.
router.route('/').get(getAllAttractions).post(createAttraction);

// La ruta con id (/:id) maneja GET para obtener uno solo.
router.route('/:id').get(getAttractionById);

export default router;