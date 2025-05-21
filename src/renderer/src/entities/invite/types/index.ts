import { ProfileDto } from '@renderer/entities/profile/types'
import { ProjectDto } from '@renderer/entities/project/types/types'

export type InviteStatus = 'pending' | 'accepted' | 'declined'

export interface InviteDto {
  _id: string
  inviter: Pick<ProfileDto, 'name' | 'iconSeed' | 'tag'>
  inviteeId: string
  project: Pick<ProjectDto, 'name'>
  status: InviteStatus
  createAt: string
}
