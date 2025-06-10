// backend/src/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // El email debe ser único
    password: { type: String, required: true },
    isEntity: { type: Boolean, required: true, default: false }, // Para "Entidad Calificadora"
  },
  {
    timestamps: true,
  }
);

// Este código se ejecuta ANTES de que un usuario se guarde en la base de datos
userSchema.pre('save', async function (next) {
  // Si la contraseña no ha sido modificada, no hacemos nada
  if (!this.isModified('password')) {
    next();
  }
  // Generamos el "salt" y encriptamos la contraseña
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Añadimos un método al modelo para comparar contraseñas
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

export default User;