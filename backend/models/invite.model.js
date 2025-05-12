import mongoose from 'mongoose'

const inviteScheme = new mongoose.Schema({
  inviterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  inviteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }
})

const Invite = mongoose.model('Invite', inviteScheme)
export default Invite
