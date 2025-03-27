import { Router } from 'express'
import { registerUser } from '../controllers/auth.controller.js'

const authRouter = Router()

// 메세지 가져오기
authRouter.post('/register-user', registerUser)

export default authRouter
