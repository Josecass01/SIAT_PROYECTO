// backend/src/middleware/multer.js
import multer from 'multer';
import path from 'path';

// Usamos 'memoryStorage' porque vamos a pasar el archivo a Cloudinary
// directamente, sin guardarlo temporalmente en el disco de nuestro servidor.
const storage = multer.memoryStorage();

function checkFileType(file, cb) {
    // AÑADIMOS 'webp' A LOS TIPOS DE ARCHIVO PERMITIDOS
    const filetypes = /jpg|jpeg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('¡Error: Solo se permiten imágenes (jpg, jpeg, png, webp)!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

export default upload;