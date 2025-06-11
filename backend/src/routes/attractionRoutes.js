// backend/src/routes/attractionRoutes.js
import express from 'express';
import {
  getAllAttractions, createAttraction, getAttractionById,
  deleteAttraction, updateAttraction, createAttractionReview,updateAttractionReview
} from '../controllers/attractionController.js';
import { protect, isEntity } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAllAttractions)
  .post(protect, isEntity, createAttraction);

router.route('/:id/reviews')
  .post(protect, createAttractionReview)
  .put(protect, updateAttractionReview);

router.route('/:id')
  .get(getAttractionById)
  .put(protect, isEntity, updateAttraction)
  .delete(protect, isEntity, deleteAttraction);

export default router;