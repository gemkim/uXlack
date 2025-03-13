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

  socket.on('send-message', (projectId, msgDto) => {
    io.to(projectId).emit('receive-message', msgDto)
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
