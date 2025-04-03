import { useProfile } from '@renderer/entities/auth/model/slices'

import { SOCKET_EVENT } from '@renderer/entities/chat/constants/socket-event'
import { useSocket } from '@renderer/entities/chat/model/slice'
import { ChatMessageDto } from '@renderer/entities/chat/types'
import { useSelectedProject, useSelectedProjectId } from '@renderer/entities/project/model/slice'
import ChatMessage from '@renderer/features/chat/chatMessage/ui/ChatMessage'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ChatContent() {
  const profile = useProfile()

  const selectedProjectId = useSelectedProjectId()
  const selectedProject = useSelectedProject()

  const socket = useSocket()

  const [currentChatList, setCurrentChatList] = useState<ChatMessageDto[]>([])
  const [isEventMount, setIsEventMount] = useState(false)

  const { register, handleSubmit, reset } = useForm<{ message: string }>()

  const chatContainerRef = useRef<HTMLDivElement>(null)

  function onSubmit(msg: { message: string }) {
    if (!profile) return
    if (!selectedProjectId) return
    if (!socket) return

    console.log(selectedProjectId)

    const newMessage: ChatMessageDto = {
      projectId: selectedProjectId,
      senderId: profile._id!,
      content: msg.message,
      type: 'text',
      status: 'sent'
    }

    console.log('submit')
    socket.emit(SOCKET_EVENT.sendMessage, selectedProjectId, newMessage)
    reset()
  }

  // 메세지 수신 이벤트 등록
  useEffect(() => {
    if (!socket) return
    console.log(socket)
    if (isEventMount) return

    socket.on(SOCKET_EVENT.receiveMessage, (msg) => {
      console.log('서버로 받은 메세지', msg)
      setCurrentChatList((prev) => [...prev, msg])
    })
    setIsEventMount(true)
  }, [socket])

  const currentProjectChatList = currentChatList.filter(
    (chat) => chat.projectId === selectedProjectId
  )

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [currentProjectChatList]) // messages가 변경될 때 실행

  return (
    <div className="flex flex-col relative max-h-full h-full">
      {/* 채팅 내용 */}
      <div ref={chatContainerRef} className="flex-1 overflow-auto p-4">
        {/* 메세지가 없을 경우 */}
        {currentProjectChatList.length < 1 && (
          <p className="absolute x-center y-center">새로운 메세지를 작성해보세요!</p>
        )}
        <div className="gap-6 flex flex-col max-w-[90%] size-full">
          {currentProjectChatList.map((chat) => (
            <ChatMessage chat={chat} key={`${selectedProjectId}-${chat._id}`} />
          ))}
        </div>
      </div>
      {/* 입력창 */}
      <div className="flex-0 shrink-0 flex items-end p-4">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-full p-2 bg-white/20 border shadow-md rounded-md outline-0"
            {...register('message')}
          />
        </form>
      </div>
    </div>
  )
}
