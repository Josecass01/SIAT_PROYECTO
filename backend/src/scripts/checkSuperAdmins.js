// Script para verificar usuarios super admin
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const checkSuperAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');
    
    const superAdmins = await User.find({ isSuperAdmin: true });
    console.log('Super Administradores encontrados:', superAdmins.length);
    
    superAdmins.forEach((admin, index) => {
      console.log(`${index + 1}. Nombre: ${admin.name}, Email: ${admin.email}`);
    });
    
    if (superAdmins.length === 0) {
      console.log('⚠️  No hay super administradores registrados');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

checkSuperAdmins();
