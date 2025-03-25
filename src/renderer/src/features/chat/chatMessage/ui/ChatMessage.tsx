import { ChatMessageDto } from '@renderer/entities/chat/types'
import { translateTimeStamp } from '@renderer/shared/lib/date/date'

interface ChatMessageProps {
  chat: ChatMessageDto
}

export default function ChatMessage(props: ChatMessageProps) {
  const { chat } = props
  const { senderId, content, timeStamp } = chat

  return (
    <div className="flex w-full gap-4 text-sm bg-white border p-4 rounded-sm shadow-sm">
      {/* 프사 */}
      <div>
        <div className="size-[40px] flex justify-center items-center bg-stone-600 rounded-full">
          <span className="text-white">{senderId[7]}</span>
        </div>
      </div>
      {/* 메세지 영역 */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{senderId}</span>
          {/* 이 부분 date-fns로 수정 필요 */}
          <span className="text-xs opacity-70">{translateTimeStamp(timeStamp)}</span>
        </div>
        <span>{content}</span>
      </div>
    </div>
  )
}
