import { ChatDto } from '../types'

interface ChatProps {
  chat: ChatDto
}

export function Chat(props: ChatProps) {
  const { chat } = props
  const { senderId, content } = chat
  return (
    <div className="flex w-full gap-4 text-sm">
      {/* 프사 */}
      <div>
        <div className="size-[40px] flex justify-center items-center bg-yellow-50 rounded-full text-black">
          <span>{senderId[7]}</span>
        </div>
      </div>
      {/* 메세지 영역 */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{senderId}</span>
          {/* 이 부분 date-fns로 수정 필요 */}
          <span className="text-xs opacity-70">오늘 오후 2:24</span>
        </div>
        <span>{content}</span>
      </div>
    </div>
  )
}
