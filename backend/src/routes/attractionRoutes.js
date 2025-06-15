// backend/src/routes/attractionRoutes.js
import express from 'express';
import {
  getAllAttractions, createAttraction, getAttractionById,
  deleteAttraction, updateAttraction, createAttractionReview, 
  updateAttractionReview, deleteAttractionReview
} from '../controllers/attractionController.js';
import { protect, isEntity } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Rutas de Atracciones ---
router.route('/')
  .get(getAllAttractions)
  .post(protect, isEntity, createAttraction);

router.route('/:id')
  .get(getAttractionById)
  .put(protect, isEntity, updateAttraction)
  .delete(protect, isEntity, deleteAttraction);

// --- Rutas de Reseñas ---
router.route('/:id/reviews')
  .post(protect, createAttractionReview)
  .put(protect, updateAttractionReview);

// --- Ruta para Eliminar una Reseña Específica ---
router.route('/:id/reviews/:reviewId')
  .delete(protect, deleteAttractionReview);

export default router;