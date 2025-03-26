export type ChatType = 'text' | 'images' | 'file'
export type ChatStatus = 'sent' | 'delivered' | 'read'

export interface ChatMessageDto {
  id: string
  projectId: string
  senderId: string
  content: string
  type: ChatType
  status: ChatStatus
  createdAt?: string
  updatedAt?: string
}
