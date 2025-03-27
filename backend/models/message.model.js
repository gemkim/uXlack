import mongoose from 'mongoose'

const messageScheme = new mongoose.Schema(
  {
    id: String,
    projectId: String,
    senderId: String,
    content: String,
    type: String,
    status: String
  },
  { timestamps: true }
)

const Message = mongoose.model('Message', messageScheme)
export default Message
