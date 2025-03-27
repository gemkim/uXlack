/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Message from '../models/message.model.js'

const setupMessageSocket = (io) => {
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
}

export default setupMessageSocket
