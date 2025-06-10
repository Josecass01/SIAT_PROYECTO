// backend/src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  // El token se envía en los headers de la petición así: 'Bearer TOKEN_AQUI'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Obtenemos el token del header
      token = req.headers.authorization.split(' ')[1];

      // 2. Verificamos el token con nuestro secreto
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Obtenemos los datos del usuario desde la BD (sin la contraseña)
      // y los adjuntamos al objeto 'req' para que las siguientes funciones lo puedan usar
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Si todo va bien, continuamos a la siguiente función (el controlador)
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('No autorizado, el token falló');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('No autorizado, no se encontró el token');
  }
};

export { protect };