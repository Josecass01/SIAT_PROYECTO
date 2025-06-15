// backend/src/routes/uploadRoutes.js
import express from 'express';
import upload from '../middleware/multer.js';
import { uploadImage } from '../controllers/uploadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Esta ruta usará el guardia 'protect' y el middleware 'upload'
router.route('/').post(protect, upload.single('image'), uploadImage);

export default router;