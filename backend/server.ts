/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
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
    io.emit('user_joined', { username, users: Object.values(users) })
  })

  socket.on('message', (data) => {
    io.emit('new_message', {
      message: data.message,
      sender: users[socket.id],
      timestamp: new Date().toISOString()
    })
  })

  socket.on('disconnect', () => {
    const username = users[socket.id]
    delete users[socket.id]
    io.emit('user_left', { username, users: Object.values(users) })
  })
})

server.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다`)
})
