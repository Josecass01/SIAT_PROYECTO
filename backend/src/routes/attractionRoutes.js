// backend/src/routes/attractionRoutes.js
import express from 'express';
import {
  getAllAttractions,
  createAttraction,
  getAttractionById,
  deleteAttraction,
  updateAttraction, // <-- 1. Importar
} from '../controllers/attractionController.js';

const router = express.Router();

router.route('/').get(getAllAttractions).post(createAttraction);

router
  .route('/:id')
  .get(getAttractionById)
  .delete(deleteAttraction)
  .put(updateAttraction); // <-- 2. Añadir el método PUT

export default router;