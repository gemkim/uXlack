import { fetchApi } from '@renderer/shared/lib/api'

import { AxiosError } from 'axios'
import { ProjectDto } from '../model/types'

export async function createProject(projectDto: ProjectDto) {
  try {
    const res = await fetchApi.post('/project', projectDto)
    return res
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === 'ERR_NETWORK') {
        return { status: 400 }
      }
    }
    return { status: 500 }
  }
}
