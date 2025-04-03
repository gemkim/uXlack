import { fetchApi } from '@renderer/shared/lib/api'

import { API_ENDPOINT } from '@renderer/shared/constants/api-endpoint'
import { AxiosError, AxiosResponse } from 'axios'
import { CreateProjectDto } from '../types/types'

export async function createProject(
  createProjectDto: CreateProjectDto
): Promise<AxiosResponse<any>> {
  try {
    const res = await fetchApi.post(API_ENDPOINT.project.create, createProjectDto)
    return res
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response
    }
    return {
      data: { message: '서버 오류 발생' },
      status: 500,
      statusText: 'Internal Server Error',
      headers: {},
      config: {} as any
    }
  }
}
