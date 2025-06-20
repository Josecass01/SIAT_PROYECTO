// Script para crear una atracción de prueba en estado pendiente
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Attraction from '../models/Attraction.js';

dotenv.config();

const createTestAttraction = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');
    
    // Crear una atracción de prueba
    const testAttraction = new Attraction({
      nombre: "Atracción de Prueba - Pendiente",
      descripcion: "Esta es una atracción de prueba para verificar el sistema de aprobación",
      categoria: "Cultural",
      horario: "9:00 AM - 5:00 PM",
      ubicacion_texto: "Centro de la ciudad",
      contacto: "123-456-7890",
      coordenadas: {
        lat: 10.391049,
        lng: -75.479426
      },
      calificacion_entidad: {
        estadoConservacion: 15,
        constitucionDelBien: 18,
        representatividadGeneral: 20
      },
      significado_entidad: "Local",
      galeria: ["https://via.placeholder.com/500x300?text=Atraccion+Prueba"],
      estado: "pendiente" // Explícitamente en estado pendiente
    });
    
    const savedAttraction = await testAttraction.save();
    console.log('✅ Atracción de prueba creada:', savedAttraction._id);
    
    // Verificar que se creó correctamente
    const pendingCount = await Attraction.countDocuments({ estado: "pendiente" });
    console.log(`Total de atracciones pendientes: ${pendingCount}`);
    
  } catch (error) {
    console.error('❌ Error creando atracción de prueba:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  }
};

createTestAttraction();
