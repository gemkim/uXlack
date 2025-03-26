/* eslint-disable @typescript-eslint/no-require-imports */
import 'dotenv/config'
import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import { Server } from 'socket.io'

import setupMessageSocket from './sockets/message.socket.js'

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

// 소켓 연동
setupMessageSocket(io)

server.listen(PORT, () => {
  console.log(`채팅 서버가 ${PORT} 포트에서 실행 중입니다`)
})
