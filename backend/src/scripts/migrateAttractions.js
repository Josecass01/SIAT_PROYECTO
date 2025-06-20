// Script para migrar atracciones existentes y agregar el campo estado
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Attraction from '../models/Attraction.js';

dotenv.config();

const migrateAttractions = async () => {
  try {    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');
    
    // Buscar todas las atracciones que no tienen el campo estado
    const attractionsToUpdate = await Attraction.find({ 
      estado: { $exists: false } 
    });
    
    console.log(`Encontradas ${attractionsToUpdate.length} atracciones para migrar`);
    
    if (attractionsToUpdate.length > 0) {
      // Actualizar todas las atracciones existentes para que estén "aprobadas"
      const result = await Attraction.updateMany(
        { estado: { $exists: false } },
        { 
          $set: { 
            estado: "aprobada",
            fechaAprobacion: new Date()
          } 
        }
      );
      
      console.log(`✅ Migración completada: ${result.modifiedCount} atracciones actualizadas`);
    } else {
      console.log('✅ No hay atracciones para migrar');
    }
    
    // Mostrar estadísticas finales
    const totalAttractions = await Attraction.countDocuments();
    const approvedAttractions = await Attraction.countDocuments({ estado: "aprobada" });
    const pendingAttractions = await Attraction.countDocuments({ estado: "pendiente" });
    const rejectedAttractions = await Attraction.countDocuments({ estado: "rechazada" });
    
    console.log('\n📊 Estadísticas finales:');
    console.log(`Total de atracciones: ${totalAttractions}`);
    console.log(`Aprobadas: ${approvedAttractions}`);
    console.log(`Pendientes: ${pendingAttractions}`);
    console.log(`Rechazadas: ${rejectedAttractions}`);
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  }
};

// Ejecutar la migración
migrateAttractions();
