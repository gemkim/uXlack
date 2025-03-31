import { Router } from 'express'
import { login, registerUser } from '../controllers/auth.controller.js'

const authRouter = Router()

// 메세지 가져오기
authRouter.post('/register-user', registerUser)
authRouter.post('/login', login)

export default authRouter
