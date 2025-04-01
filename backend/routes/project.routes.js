import { Router } from 'express'
import { registerProject } from '../controllers/project.controller.js'

const projectRouter = Router()

// 메세지 가져오기
projectRouter.post('/create', registerProject)
// projectRouter.post('/delete', () => {})
// projectRouter.post('/edit', () => {})

export default projectRouter
