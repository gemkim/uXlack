import { ProjectDto } from '../model/types'

export type CreateProjectDto = Pick<ProjectDto, 'name' | 'memberList'>
