interface TaskTag {
  name: string
  color: string
  // 몽고 Db 자동생성
  _id: string
}
export interface ProjectDto {
  name: string
  memberList: string[]
  taskList: string[]
  _id: string
  createdAt?: string
  updatedAt?: string
  src?: string
  coverSrc?: string | null
  taskTagList: TaskTag[]
}

export type CreateProjectDto = Pick<ProjectDto, 'name' | 'memberList'>
