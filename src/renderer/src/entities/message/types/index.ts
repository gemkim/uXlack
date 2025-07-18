export type MessageType = 'text' | 'images' | 'file'
export type MessageStatus = 'sent' | 'delivered' | 'read'

export interface MessageDto {
  _id?: string
  projectId: string
  senderId: string
  content: string
  type: MessageType
  status: MessageStatus
  assigneeIdList?: string[]
  createdAt?: string
  updatedAt?: string
}
