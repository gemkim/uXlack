import mongoose from 'mongoose'

const userScheme = new mongoose.Schema(
  {
    account: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    authProvider: String
  },
  { timestamps: true }
)

const User = mongoose.model('User', userScheme)
export default User
