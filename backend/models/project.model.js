import mongoose from 'mongoose'

const projectScheme = new mongoose.Schema(
  {
    name: String,
    memberList: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    taskList: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    coverSrc: { type: String, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId }
  },
  { timestamps: true }
)

const Project = mongoose.model('Project', projectScheme)
export default Project
