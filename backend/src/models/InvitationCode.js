// backend/src/models/InvitationCode.js
import mongoose from 'mongoose';

const invitationCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  isUsed: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const InvitationCode = mongoose.model('InvitationCode', invitationCodeSchema);

export default InvitationCode;