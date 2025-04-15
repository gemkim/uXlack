import mongoose from 'mongoose'

const profileScheme = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  projectList: [],
  iconSeed: { type: String, default: null }
})

const Profile = mongoose.model('Profile', profileScheme)
export default Profile
