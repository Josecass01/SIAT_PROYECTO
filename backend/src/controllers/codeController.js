// backend/src/controllers/codeController.js
import InvitationCode from '../models/InvitationCode.js';
import crypto from 'crypto';

// @desc    Obtener todos los códigos de invitación
// @route   GET /api/codes
// @access  SuperAdmin
const getAllCodes = async (req, res) => {
    const codes = await InvitationCode.find({}).populate('user', 'name email');
    res.json(codes);
};

// @desc    Crear un nuevo código de invitación
// @route   POST /api/codes
// @access  SuperAdmin
const createCode = async (req, res) => {
    // Generamos un código más aleatorio
    const newCode = `SIAT-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    const code = new InvitationCode({
        code: newCode,
    });

    const createdCode = await code.save();
    res.status(201).json(createdCode);
};

export { getAllCodes, createCode };