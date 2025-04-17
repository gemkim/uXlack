import mongoose from 'mongoose'

const profileScheme = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  tag: { type: String, required: true },
  projectList: [],
  iconSeed: { type: String, default: null }
})

profileScheme.index({ nickname: 1, tag: 1 }, { unique: true }) // 중복 방지
const Profile = mongoose.model('Profile', profileScheme)
export default Profile
