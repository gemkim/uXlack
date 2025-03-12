/* eslint-disable @typescript-eslint/no-require-imports */
import express from 'express'
import http from 'http'
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
const users = {}

io.on('connection', (socket) => {
  console.log('새 사용자 연결:', socket.id)

  socket.on('user_join', (username) => {
    users[socket.id] = username

    console.log('userId :', username)

    io.emit('user_joined', { username, users: Object.values(users) })
  })

  socket.on('message', (data) => {
    io.emit('new_message', {
      message: data.message,
      sender: users[socket.id],
      timestamp: new Date().toISOString()
    })
  })
})

server.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다`)
})
