import { ChatMessageDto } from '@renderer/entities/chat'
import { TaskDto } from '@renderer/entities/task/types'

export interface ProjectDto {
  id: string
  name: string
  memberList: unknown[]
  timeStamp: number
  src?: string
  messageList: ChatMessageDto[]
  taskList: TaskDto[]
}
