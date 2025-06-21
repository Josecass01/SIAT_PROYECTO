/*
 * SIAT Tourism Platform - Backend Server
 * Copyright (c) 2025 Jose Luis Castellanos Guardia, Ronald Roman Valdes y Evaristo Feria Perez
 * Todos los derechos reservados.
 * 
 * Servidor Express.js para API REST del sistema de turismo
 * Desarrollado como proyecto académico - Uso no autorizado prohibido
 */

// backend/src/server.js

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'; // Ya lo tienes importado, ¡genial!
import connectDB from './db.js';
import attractionRoutes from './routes/attractionRoutes.js';
import userRoutes from './routes/userRoutes.js';
import codeRoutes from './routes/codeRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

connectDB();
const app = express();

// **MODIFICACIÓN AQUÍ: Configuración de CORS**
// Permitir solicitudes desde tu frontend React
app.use(cors({
    origin: 'http://localhost:5173', // O el puerto donde se ejecuta tu frontend React (común: 3000 o 5173 con Vite)
    credentials: true // Permite el envío de cookies de autenticación, si las usas
}));

app.use(express.json()); // Middleware para parsear JSON en las solicitudes

// Ruta de prueba (la podemos dejar o quitar)
app.get('/', (req, res) => {
  res.send('¡Hola! El backend de SIAT Cartagena está funcionando.');
});

// Rutas de la API
app.use('/api/attractions', attractionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/codes', codeRoutes);
app.use('/api/upload', uploadRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});