export interface TaskDto {
  projectId: string
  name: string
  desc: string
  startDate: Date
  endDate?: Date
  // tag도 있어야할듯한데
  tagId: string
  // 일정 관련자들의 profileId 배열
  assignee?: string[]

  // mongoose 자동 생성 필드
  _id?: string
  createAt?: string
  updatedAt?: string
}
