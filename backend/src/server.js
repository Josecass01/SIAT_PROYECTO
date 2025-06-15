// backend/src/server.js

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import attractionRoutes from './routes/attractionRoutes.js'; // <-- 1. IMPORTAR RUTAS
import userRoutes from './routes/userRoutes.js'; // <-- 1. Importar rutas de usuario
import codeRoutes from './routes/codeRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba (la podemos dejar o quitar)
app.get('/', (req, res) => {
  res.send('¡Hola! El backend de SIAT Cartagena está funcionando.');
});

// <-- 2. USAR LAS RUTAS -->
// Le decimos a Express que cualquier ruta que empiece por '/api/attractions'
// debe ser manejada por nuestro 'attractionRoutes'.
app.use('/api/attractions', attractionRoutes);
app.use('/api/users', userRoutes); // <-- 2. Usar las rutas de usuario
app.use('/api/codes', codeRoutes);
app.use('/api/upload', uploadRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});