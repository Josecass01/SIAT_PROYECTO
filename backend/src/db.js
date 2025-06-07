// backend/src/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Usamos la variable de entorno, como debe ser
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Conectada Exitosamente.'); // El mensaje normal
  } catch (error) {
    console.error(`Error de conexión con MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;