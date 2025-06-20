// backend/src/routes/attractionRoutes.js
import express from 'express';
import {
  getAllAttractions,
  createAttraction,
  getAttractionById,
  deleteAttraction,
  updateAttraction,
  createAttractionReview, 
  updateAttractionReview,
  deleteAttractionReview,
  getAttractionsForHome,
  // Nuevas importaciones para el sistema de aprobación
  getPendingAttractions,
  approveAttraction,
  rejectAttraction,
  getMyAttractions
} from '../controllers/attractionController.js';
import { protect, isEntity, isSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Rutas de Atracciones ---
router.route('/')
  .get(getAllAttractions)
  .post(protect, isEntity, createAttraction);

// **NUEVA RUTA PÚBLICA PARA LA PÁGINA PRINCIPAL**
// Esta ruta es pública y no requiere autenticación
router.get('/public/home', getAttractionsForHome);

// --- RUTAS PARA SISTEMA DE APROBACIÓN (DEBEN IR ANTES DE /:id) ---
// Obtener atracciones pendientes (solo SuperAdmin)
router.get('/pending', protect, isSuperAdmin, getPendingAttractions);

// Obtener mis atracciones (para entidades)
router.get('/my/attractions', protect, getMyAttractions);

// --- RUTAS CON PARÁMETROS (DEBEN IR AL FINAL) ---
router.route('/:id')
  .get(getAttractionById)
  .put(protect, isEntity, updateAttraction)
  .delete(protect, isEntity, deleteAttraction);

// Aprobar/Rechazar atracciones (solo SuperAdmin)
router.put('/:id/approve', protect, isSuperAdmin, approveAttraction);
router.put('/:id/reject', protect, isSuperAdmin, rejectAttraction);

// --- Rutas de Reseñas ---
router.route('/:id/reviews')
  .post(protect, createAttractionReview)
  .put(protect, updateAttractionReview);

// --- Ruta para Eliminar una Reseña Específica ---
router.route('/:id/reviews/:reviewId')
  .delete(protect, deleteAttractionReview);

export default router;