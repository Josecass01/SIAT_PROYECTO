// backend/src/models/Attraction.js
import mongoose from 'mongoose';

const attractionSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true },
  categoria: { type: String, required: true },
  horario: { type: String },
  ubicacion_texto: { type: String },
  contacto: { type: String },
  galeria: [{ type: String }], // Un array de URLs de imágenes
  rating_usuario: { type: Number, default: 0 },
  vistas_usuario: { type: Number, default: 0 },
  calificacion_entidad: {
    estadoConservacion: Number,
    constitucionDelBien: Number,
    representatividadGeneral: Number,
  },
  significado_entidad: { type: String },
  comentarios: [
    {
      usuario: String,
      texto: String,
      fecha: { type: Date, default: Date.now }
    }
  ],
  coordenadas: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }
}, {
  timestamps: true // Añade createdAt y updatedAt automáticamente
});

const Attraction = mongoose.model('Attraction', attractionSchema);

export default Attraction;