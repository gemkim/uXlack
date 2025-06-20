export interface TaskDto {
  projectId: string
  name: string
  desc: string
  startDate: string
  endDate?: string
  // tag도 있어야할듯한데
  tagId: string
  // 일정 관련자들의 profileId 배열
  assignee?: string[]
  // 일정 생성자 profile _id
  createBy: string
  // mongoose 자동 생성 필드
  _id?: string
  createAt?: string
  updatedAt?: string
}
