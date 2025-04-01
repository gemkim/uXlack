export interface ProjectDto {
  name: string
  memberList: string[]
  messageList: string[]
  taskList: string[]
  _id?: string
  createdAt?: string
  updatedAt?: string
  src?: string
  coverSrc?: string | null
}
