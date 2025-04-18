import { ProfileDto } from '@renderer/entities/auth/types'

export interface ProjectDto {
  name: string
  memberList: string[]
  taskList: string[]
  _id?: string
  createdAt?: string
  updatedAt?: string
  src?: string
  coverSrc?: string | null
}

export type CreateProjectDto = Pick<ProjectDto, 'name' | 'memberList'>

export type InviteStatus = 'pending' | 'accepted' | 'declined'

export interface InviteDto {
  _id: string
  inviter: Pick<ProfileDto, 'name' | 'iconSeed' | 'tag'>
  inviteeId: string
  project: Pick<ProjectDto, 'name'>
  status: InviteStatus
  createAt: string
}
