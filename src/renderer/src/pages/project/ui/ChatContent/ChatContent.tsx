import { useMyProfile } from '@renderer/entities/profile/model/slice'

import { SOCKET_EVENT } from '@renderer/shared/lib/socket/conetants/socket-event'
import { useSocket } from '@renderer/shared/lib/socket/model/slice'

import ChatMessage from '@renderer/features/chat/ui/ChatMessage'

import { useMessageListByProjectId } from '@renderer/entities/message/model/slice'
import { MessageDto } from '@renderer/entities/message/types'
import { useSelectedProject } from '@renderer/entities/project/model/slice'
import { useEffect, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'

export default function ChatContent() {
  const myProfile = useMyProfile()

  const selectedProject = useSelectedProject()
  const socket = useSocket()

  const { register, handleSubmit, reset } = useForm<{ message: string }>()
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const messageListByProjectId = useMessageListByProjectId()

  const currentProjectMessageList = useMemo(() => {
    return messageListByProjectId[selectedProject?._id ?? ''] ?? []
  }, [messageListByProjectId, selectedProject?._id])

  console.log('currentProjectMessageList', currentProjectMessageList)

  function onSubmit(msg: { message: string }) {
    if (!myProfile) return
    if (!selectedProject) return
    if (!socket) return

    const newMessage: MessageDto = {
      projectId: selectedProject._id,
      senderId: myProfile._id!,
      content: msg.message,
      type: 'text',
      status: 'sent'
    }

    socket.emit(SOCKET_EVENT.sendMessage, selectedProject._id, newMessage)
    reset()
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [currentProjectMessageList]) // messages가 변경될 때 실행

  return (
    <div className="flex flex-col relative max-h-full h-full">
      {/* 채팅 내용 */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden p-4">
        {/* 메세지가 없을 경우 */}
        {currentProjectMessageList.length < 1 && (
          <p className="absolute x-center y-center">새로운 메세지를 작성해보세요!</p>
        )}
        <div className="gap-6 flex flex-col max-w-[90%] size-full">
          {currentProjectMessageList.map((chat) => (
            <ChatMessage chat={chat} key={`${selectedProject!._id}-${chat._id}`} />
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
