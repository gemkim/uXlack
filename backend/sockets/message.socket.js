/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Message from '../models/message.model.js'

const setupMessageSocket = (io) => {
  io.on('connection', (socket) => {
    const profileId = socket.handshake.query.profileId
    console.log('새 사용자 연결:', socket.id, profileId)

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

      callback(messages)
    })
  })
}

export default setupMessageSocket
