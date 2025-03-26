/* eslint-disable @typescript-eslint/no-require-imports */
import 'dotenv/config'
import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

const PORT = 4000
const MONGO_URI = process.env.MONGO_URI

// Mongo DB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('mongo connect'))
  .catch((err) => console.log(err))

const messageScheme = new mongoose.Schema(
  {
    id: String,
    projectId: String,
    senderId: String,
    content: String,
    type: String,
    status: String
  },
  { timestamps: true }
)

const Message = mongoose.model('Message', messageScheme)

// 로그인시 최초 소켓 세션 연결
io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId
  console.log('새 사용자 연결:', socket.id, userId)

  // 프로젝트(채팅) 입장
  socket.on('join-rooms', (projectIdList) => {
    projectIdList.forEach((projectId) => {
      socket.join(projectId)
      console.log(socket.id, '방참여', projectId)
    })
  })

  socket.on('send-message', async (projectId, msgDto) => {
    const newMessage = new Message({
      ...msgDto
    })
    await newMessage.save()

    io.to(projectId).emit('receive-message', msgDto)
  })

  socket.on('get-all-projects-message-list', async (projectId, callback) => {
    const messages = await Message.find({ projectId }).sort({ createdAt: 1 })

    // projectIdList.forEach(async (id) => {
    //   const messages = await Message.find({ projectId: id }).sort({ createdAt: 1 })
    //   messageOfProject.id = messages
    // })
    callback(messages)
  })
  // socket.on('user_join', (username) => {
  //   users[socket.id] = username

  //   console.log('userId :', username)

  //   io.emit('user_joined', { username, users: Object.values(users) })
  // })
})

server.listen(PORT, () => {
  console.log(`채팅 서버가 ${PORT} 포트에서 실행 중입니다`)
})
