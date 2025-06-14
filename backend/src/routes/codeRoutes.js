// backend/src/routes/codeRoutes.js
import express from 'express';
import { getAllCodes, createCode } from '../controllers/codeController.js';
import { protect, isSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Aplicamos ambos guardias: primero 'protect' para asegurar que hay sesión,
// luego 'isSuperAdmin' para asegurar que tiene el rol correcto.
router.route('/')
    .get(protect, isSuperAdmin, getAllCodes)
    .post(protect, isSuperAdmin, createCode);

export default router;