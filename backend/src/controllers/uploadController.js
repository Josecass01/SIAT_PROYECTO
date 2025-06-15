// backend/src/controllers/uploadController.js
import cloudinary from '../config/cloudinary.js';
import DatauriParser from 'datauri/parser.js';
import path from 'path';

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
        }

        const parser = new DatauriParser();
        const dataUri = parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);

        const result = await cloudinary.uploader.upload(dataUri.content, {
            folder: 'siat-cartagena', // Puedes nombrar la carpeta como quieras en Cloudinary
        });

        // Devolvemos la URL segura de la imagen subida
        res.status(200).json({ url: result.secure_url });

    } catch (error) {
        console.error('Error al subir la imagen:', error);
        res.status(500).json({ message: 'Error en el servidor al subir la imagen.' });
    }
};

export { uploadImage };