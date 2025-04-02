/* eslint-disable @typescript-eslint/no-require-imports */
import 'dotenv/config'
import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import cors from 'cors'
import setupMessageSocket from './sockets/message.socket.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import authRouter from './routes/auth.routes.js'
import projectRouter from './routes/project.routes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger.js'

export const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})
const PORT = 4000
// Mongo DB
const MONGO_URI = process.env.MONGO_URI
const SESSION_KEY = process.env.SESSION_KEY

// 세션
app.use(
  session({
    secret: SESSION_KEY, // 보안을 위해 .env에서 관리
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
  })
)

// 미들웨어
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

// 라우터 연동
app.use('/auth', authRouter)
app.use('/project', projectRouter)
// 스웨거 라우터
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('mongo connect'))
  .catch((err) => console.log(err))

// 소켓 연동
setupMessageSocket(io)

server.listen(PORT, () => {
  console.log(`채팅 서버가 ${PORT} 포트에서 실행 중입니다`)
})
