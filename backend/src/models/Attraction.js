// backend/src/models/Attraction.js
import mongoose from 'mongoose';

// --- NUEVO: Esquema para las Reseñas ---
// Una reseña es un sub-documento que vivirá dentro de cada atracción.
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true }, // Nombre del usuario que hace la reseña
    rating: { type: Number, required: true }, // Calificación de 1 a 5
    comment: { type: String, required: true }, // El texto del comentario
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Referencia al modelo de Usuario
    },
  },
  {
    timestamps: true,
  }
);

const attractionSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true },
  categoria: { type: String, required: true },
  // --- NUEVOS CAMPOS PARA CALIFICACIONES Y RESEÑAS ---
  reviews: [reviewSchema], // Un array que contendrá todas las reseñas de esta atracción
  rating: {
    type: Number,
    required: true,
    default: 0, // Calificación promedio
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0, // Número total de reseñas
  },
  // --- El resto de los campos que ya teníamos ---
  horario: { type: String },
  ubicacion_texto: { type: String },
  contacto: { type: String },
  galeria: [{ type: String }],
  calificacion_entidad: {
    estadoConservacion: Number,
    constitucionDelBien: Number,
    representatividadGeneral: Number,
  },
  significado_entidad: { type: String },
  coordenadas: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  // Este campo no lo usamos activamente pero lo podemos dejar
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
}, {
  timestamps: true
});

const Attraction = mongoose.model('Attraction', attractionSchema);

export default Attraction;