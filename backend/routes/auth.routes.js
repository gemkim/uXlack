import { Router } from 'express'
import { login, logout, registerUser } from '../controllers/auth.controller.js'

const authRouter = Router()

// 메세지 가져오기
authRouter.post('/register-user', registerUser)
authRouter.post('/login', login)
authRouter.post('/logout', logout)

export default authRouter
