import { ChatMessage, ChatInput } from '@renderer/features/chat'
import { ChatMessageDto } from '@renderer/features/chat/types'

interface ChatSectionProps {
  chatList: ChatMessageDto[]
}

export function ChatSection(props: ChatSectionProps) {
  const { chatList } = props
  return (
    <div className="bg-black flex-1 text-white p-4 overflow-y-auto flex flex-col">
      {/* 채팅 내용 영역 */}
      <div className="gap-6 flex flex-col max-w-[90%]">
        {chatList.map((chat) => (
          <ChatMessage chat={chat} key={chat.id} />
        ))}
      </div>
      {/* 채팅 입력 영역 */}
      <div className="mt-auto">
        <ChatInput />
      </div>
    </div>
  )
}
