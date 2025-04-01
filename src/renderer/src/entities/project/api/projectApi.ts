import { fetchApi } from '@renderer/shared/lib/api'

import { AxiosError, AxiosResponse } from 'axios'
import { ProjectDto } from '../model/types'

export async function createProject(projectDto: ProjectDto): Promise<AxiosResponse<any>> {
  try {
    const res = await fetchApi.post('/project/create', projectDto)
    return res
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response!
    }
  }
}
