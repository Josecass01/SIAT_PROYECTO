// backend/src/models/Attraction.js
import mongoose from 'mongoose';

// ... (reviewSchema no cambia)
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

const attractionSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true },
  
  // --- CAMPO MEJORADO: CATEGORIA CON OPCIONES FIJAS ---
  categoria: { 
    type: String, 
    required: true,
    enum: ["Histórico", "Cultural", "Natural", "UNESCO Site", "Religioso"]
  },
  
  // ... (reviews, rating, numReviews no cambian)
  reviews: [reviewSchema],
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  
  horario: { type: String },
  ubicacion_texto: { type: String }, // <-- Este es el campo para la dirección
  contacto: { type: String },
  galeria: [{ type: String }],

  // --- NUEVA ESTRUCTURA PARA LA CALIFICACIÓN DE LA ENTIDAD ---
  calificacion_entidad: {
    estadoConservacion: { type: Number, min: 0, max: 21, default: 0 },
    constitucionDelBien: { type: Number, min: 0, max: 21, default: 0 },
    representatividadGeneral: { type: Number, min: 0, max: 28, default: 0 },
  },
  
  // --- CAMPO MEJORADO: SIGNIFICADO CON OPCIONES FIJAS ---
  significado_entidad: { 
    type: String,
    enum: ["Local", "Regional", "Nacional", "Internacional"]
  },

  coordenadas: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
}, {
  timestamps: true
});

const Attraction = mongoose.model('Attraction', attractionSchema);

export default Attraction;