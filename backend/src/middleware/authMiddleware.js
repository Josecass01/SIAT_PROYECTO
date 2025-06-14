// backend/src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Guardia 1: Verifica si el usuario ha iniciado sesión
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'No autorizado, el token falló' });
      return;
    }
  }
  if (!token) {
    res.status(401).json({ message: 'No autorizado, no se encontró el token' });
  }
};

// Guardia 2: Verifica si el usuario es una Entidad Calificadora
const isEntity = (req, res, next) => {
  if (req.user && req.user.isEntity) {
    next();
  } else {
    res.status(403).json({ message: 'No tienes permiso. Se requiere rol de Entidad.' });
  }
};

// --- NUEVO GUARDIA 3: Verifica si el usuario es Super-Admin ---
const isSuperAdmin = (req, res, next) => {
    if (req.user && req.user.isSuperAdmin) {
        next(); // Si es Super-Admin, puede pasar
    } else {
        res.status(403).json({ message: 'Acción no permitida. Se requiere rol de Super-Admin.' });
    }
};

export { protect, isEntity, isSuperAdmin };