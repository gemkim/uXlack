import { ChatDto } from '@renderer/features/chat/ui/Chat/types'
import { Chat } from '@renderer/features/chat/ui/Chat/ui/Chat'

const TEMP_CHAT_LIST: ChatDto[] = [
  {
    id: 'msg_001',
    chatId: 'room_123',
    senderId: 'user_001',
    content: '안녕하세요! 잘 지내시나요?',
    timeStamp: 1709635200,
    types: 'text',
    status: 'sent'
  },
  {
    id: 'msg_002',
    chatId: 'room_123',
    senderId: 'user_002',
    content: '네! 오늘 날씨가 정말 좋네요 ☀️',
    timeStamp: 1709635300,
    types: 'text',
    status: 'delivered'
  },
  {
    id: 'msg_003',
    chatId: 'room_123',
    senderId: 'user_001',
    content: '이 사진 봐봐요!',
    timeStamp: 1709635400,
    types: 'images',
    status: 'read'
  },
  {
    id: 'msg_004',
    chatId: 'room_123',
    senderId: 'user_002',
    content: '오! 멋진 사진이네요 📸',
    timeStamp: 1709635500,
    types: 'text',
    status: 'read'
  },
  {
    id: 'msg_005',
    chatId: 'room_123',
    senderId: 'user_001',
    content: '회의 자료 첨부할게요.',
    timeStamp: 1709635600,
    types: 'file',
    status: 'sent'
  }
]

export function ChatSection() {
  return (
    <div className="bg-black flex-1 text-white p-4 overflow-y-auto">
      <div className="gap-6 flex flex-col">
        {TEMP_CHAT_LIST.map((chat) => (
          <Chat chat={chat} key={chat.chatId} />
        ))}
      </div>
    </div>
  )
}
