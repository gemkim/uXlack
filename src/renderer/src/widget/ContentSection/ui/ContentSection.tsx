import { useUser } from '@renderer/entities/auth'
import { useSocket } from '@renderer/entities/chat'
import { SOCKET_EVENT } from '@renderer/entities/chat/constants/socket-event'
import { ChatMessageDto } from '@renderer/entities/chat/types'
import { useProjectList, useSelectedProjectId } from '@renderer/entities/project'
import { ChatMessage } from '@renderer/features/chat'
import { WindowController } from '@renderer/shared/ui'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export function ContentSection() {
  const user = useUser()
  const projectList = useProjectList()
  const selectedProjectId = useSelectedProjectId()
  const selectedProject = projectList.find((project) => project.id === selectedProjectId)
  const socket = useSocket()

  const [currentChatList, setCurrentChatList] = useState<ChatMessageDto[]>([])
  const [isEventMount, setIsEventMount] = useState(false)

  const { register, handleSubmit, reset } = useForm<{ message: string }>()

  function onSubmit(msg: { message: string }) {
    if (!user) return
    if (!selectedProjectId) return
    if (!socket) return

    const newMessage: ChatMessageDto = {
      id: new Date().getTime().toString(),
      chatId: selectedProjectId,
      senderId: user.id,
      content: msg.message,
      timeStamp: new Date().getTime(),
      types: 'text',
      status: 'sent'
    }

    socket.emit(SOCKET_EVENT.sendMessage, selectedProjectId, newMessage)
    reset()
  }

  // 프로젝트 변경 처리
  // 해당 컴포넌트가 아니라 Provider 레벨에서 zustandfh 관리해야할듯함
  useEffect(() => {
    if (!selectedProject) return

    setCurrentChatList(selectedProject.messageList)
  }, [selectedProject])

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

  const currentProjectChatList = currentChatList.filter((chat) => chat.chatId === selectedProjectId)
  return (
    <div className="flex-1 h-screen overflow-y-auto flex flex-col rounded-sm bg-zinc-50">
      {/* 드래그 탭 */}
      <div className="w-full border-b bg-white flex">
        <div className="flex-1 " style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}></div>
        <div className="p-4">
          <WindowController />
        </div>
      </div>
      {/* 채팅 내용 */}
      <div className="flex-1 overflow-auto mb-4">
        <div className="gap-6 flex flex-col max-w-[90%] size-full p-4">
          {currentProjectChatList.map((chat) => (
            <ChatMessage chat={chat} key={`${selectedProjectId}-${chat.timeStamp}`} />
          ))}
          {/* 메세지가 없을 경우 */}
          {currentProjectChatList.length < 1 && (
            <div className="size-full flex justify-center items-center text-white/70">
              <p>새로운 메세지를 작성해보세요!</p>
            </div>
          )}
        </div>
      </div>
      {/* 입력창 */}
      <div className="mt-auto p-4 !pt-0 w-full ">
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
{
  /* 채팅 입력 영역 */
}
