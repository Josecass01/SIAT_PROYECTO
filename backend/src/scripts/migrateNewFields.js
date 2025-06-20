// Script para migrar atracciones existentes y agregar los nuevos campos
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Attraction from '../models/Attraction.js';

dotenv.config();

const migrateNewFields = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');
    
    // Buscar todas las atracciones que no tienen los nuevos campos
    const attractionsToUpdate = await Attraction.find({ 
      $or: [
        { departamento: { $exists: false } },
        { municipio: { $exists: false } },
        { administrador_propietario: { $exists: false } },
        { codigo_asignado: { $exists: false } }
      ]
    });
    
    console.log(`Encontradas ${attractionsToUpdate.length} atracciones para migrar`);
    
    if (attractionsToUpdate.length > 0) {
      // Actualizar cada atracción individualmente para generar códigos únicos
      for (let i = 0; i < attractionsToUpdate.length; i++) {
        const attraction = attractionsToUpdate[i];
        const codigoUnico = `ATR-${Date.now()}-${i.toString().padStart(3, '0')}`;
        
        await Attraction.updateOne(
          { _id: attraction._id },
          { 
            $set: { 
              departamento: attraction.departamento || "Bolívar",
              municipio: attraction.municipio || "Cartagena",
              administrador_propietario: attraction.administrador_propietario || "No especificado",
              codigo_asignado: attraction.codigo_asignado || codigoUnico
            } 
          }
        );
        
        console.log(`Migrada atracción: ${attraction.nombre} - Código: ${codigoUnico}`);
      }
      
      console.log(`✅ Migración completada: ${attractionsToUpdate.length} atracciones actualizadas`);
    } else {
      console.log('✅ No hay atracciones para migrar');
    }
    
    // Mostrar estadísticas finales
    const totalAttractions = await Attraction.countDocuments();
    const withNewFields = await Attraction.countDocuments({ 
      departamento: { $exists: true },
      municipio: { $exists: true },
      administrador_propietario: { $exists: true },
      codigo_asignado: { $exists: true }
    });
    
    console.log('\n📊 Estadísticas finales:');
    console.log(`Total de atracciones: ${totalAttractions}`);
    console.log(`Con nuevos campos: ${withNewFields}`);
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  }
};

// Ejecutar la migración
migrateNewFields();
