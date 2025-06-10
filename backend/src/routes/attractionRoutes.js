// backend/src/routes/attractionRoutes.js
import express from 'express';
import {
  getAllAttractions,
  createAttraction,
  getAttractionById,
  deleteAttraction,
  updateAttraction,
} from '../controllers/attractionController.js';
import { protect } from '../middleware/authMiddleware.js'; // Importamos el guardia

const router = express.Router();

// --- Rutas para la colección (/api/attractions) ---
router
  .route('/')
  .get(getAllAttractions) // GET es público, cualquiera puede ver la lista.
  .post(protect, createAttraction); // POST para crear está protegido.

// --- Rutas para un item específico (/api/attractions/:id) ---
router
  .route('/:id')
  .get(getAttractionById) // GET es público, cualquiera puede ver el detalle.
  .put(protect, updateAttraction) // PUT para actualizar está protegido.
  .delete(protect, deleteAttraction); // DELETE para eliminar está protegido.

export default router;