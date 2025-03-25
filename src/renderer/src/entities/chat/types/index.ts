export type ChatType = 'text' | 'images' | 'file'
export type ChatStatus = 'sent' | 'delivered' | 'read'

export interface ChatMessageDto {
  id: string
  chatId: string
  senderId: string
  content: string
  timeStamp: number
  types: ChatType
  status: ChatStatus
}
