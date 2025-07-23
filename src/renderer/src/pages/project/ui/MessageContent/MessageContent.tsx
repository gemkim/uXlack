import { useMessageListByProjectId } from '@renderer/entities/message/model/slice'
import { useSelectedProject } from '@renderer/entities/project/model/slice'
import MessageItem from '@renderer/features/message/ui/MessageItem'
import MessageForm from '@renderer/features/message/ui/MessageForm'
import { useEffect, useMemo, useRef } from 'react'

export default function MessageContent() {
  const selectedProject = useSelectedProject()

  const chatContainerRef = useRef<HTMLDivElement>(null)

  const messageListByProjectId = useMessageListByProjectId()

  const currentProjectMessageList = useMemo(() => {
    return messageListByProjectId[selectedProject?._id ?? ''] ?? []
  }, [messageListByProjectId, selectedProject?._id])

  console.log('currentProjectMessageList', currentProjectMessageList)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [currentProjectMessageList]) // messages가 변경될 때 실행

  return (
    <div className='flex flex-col relative max-h-full h-full'>
      {/* 채팅 내용 */}
      <div ref={chatContainerRef} className='flex-1 overflow-y-auto overflow-x-hidden p-4'>
        {/* 메세지가 없을 경우 */}
        {currentProjectMessageList.length < 1 && (
          <p className='absolute x-center y-center'>새로운 메세지를 작성해보세요!</p>
        )}
        <div className='gap-6 flex flex-col max-w-[90%] size-full'>
          {currentProjectMessageList.map((message) => (
            <MessageItem message={message} key={`${selectedProject!._id}-${message._id}`} />
          ))}
        </div>
      </div>
      {/* 입력창 */}
      <div className='flex-0 shrink-0 flex items-end p-4'>
        <MessageForm />
      </div>
    </div>
  )
}
