// backend/src/controllers/userController.js
import User from '../models/User.js';
import InvitationCode from '../models/InvitationCode.js';
import generateToken from '../utils/generateToken.js';

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, invitationCode } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: 'El usuario ya existe' });
    return;
  }

  let isEntity = false;
  if (invitationCode) {
    const codeDoc = await InvitationCode.findOne({ code: invitationCode });
    if (codeDoc && !codeDoc.isUsed) {
      isEntity = true;
    } else {
      res.status(400).json({ message: 'Código de invitación inválido o ya ha sido utilizado.' });
      return;
    }
  }

  const user = await User.create({
    name: `${firstName} ${lastName}`,
    email,
    password,
    isEntity,
  });

  if (user) {
    if (isEntity) {
        const usedCode = await InvitationCode.findOne({ code: invitationCode });
        usedCode.isUsed = true;
        usedCode.user = user._id;
        await usedCode.save();
    }
    res.status(201).json({
      _id: user._id, name: user.name, email: user.email, isEntity: user.isEntity, token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Datos de usuario inválidos' });
  }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id, name: user.name, email: user.email, isEntity: user.isEntity,isSuperAdmin: user.isSuperAdmin, token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Email o contraseña inválidos' });
    }
};

export { registerUser, loginUser };