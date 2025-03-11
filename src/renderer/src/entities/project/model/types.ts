import { ChatMessageDto } from '@renderer/entities/chat'

export interface ProjectDto {
  id: string
  name: string
  memberList: unknown[]
  timeStamp: number
  src?: string
  messageList: ChatMessageDto[]
}
