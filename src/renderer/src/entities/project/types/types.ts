export interface ProjectDto {
  name: string
  memberList: string[]
  taskList: string[]
  _id: string
  createdAt?: string
  updatedAt?: string
  src?: string
  coverSrc?: string | null
}

export type CreateProjectDto = Pick<ProjectDto, 'name' | 'memberList'>
