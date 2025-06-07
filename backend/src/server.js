// backend/src/server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Inicializar la aplicación de Express
const app = express();

// Middlewares
app.use(cors()); // Permite peticiones de otros orígenes (nuestro frontend)
app.use(express.json()); // Permite al servidor entender y procesar JSON

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola! El backend de SIAT Cartagena está funcionando.');
});

// Definir el puerto
const PORT = process.env.PORT || 4000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});