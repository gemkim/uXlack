export type chatType = 'text' | 'images' | 'file'
export type chatStatus = 'sent' | 'delivered' | 'read'

export interface ChatMessageDto {
  id: string
  chatId: string
  senderId: string
  content: string
  timeStamp: number
  types: chatType
  status: chatStatus
}
