// backend/src/controllers/userController.js
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// --- FUNCIÓN DE REGISTRO (SIN CAMBIOS) ---
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, isEntity } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('El usuario ya existe');
  }

  const user = await User.create({
    name: `${firstName} ${lastName}`,
    email,
    password,
    isEntity,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isEntity: user.isEntity,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Datos de usuario inválidos');
  }
};


// --- FUNCIÓN DE LOGIN (CORREGIDA) ---
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // La respuesta JSON ahora SÍ incluye el token.
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isEntity: user.isEntity,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Email o contraseña inválidos');
  }
};

export { registerUser, loginUser };