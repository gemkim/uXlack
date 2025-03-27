import mongoose from 'mongoose'

const projectScheme = new mongoose.Schema({
  name: String,
  projectList: []
})

const Project = mongoose.model('Project', projectScheme)
export default Project
