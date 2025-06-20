import { TaskDto } from '../types'
import { API_ENDPOINT } from '../../../shared/constants/api-endpoint'
import { fetchApi } from '../../../shared/lib/api'

export const taskApi = {
  create: async (data: TaskDto): Promise<TaskDto> => {
    try {
      const res = await fetchApi.post(API_ENDPOINT.task.create, data)
      console.log('요청 데이터:', res.data)
      return res.data
    } catch (error: any) {
      throw new Error(error.response.data.message || '일정 생성 실패')
    }
  },
  delete: async (taskId: string): Promise<void> => {
    try {
      await fetchApi.delete(`${API_ENDPOINT.task.delete}/${taskId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '일정 삭제 실패');
    }
  },
}
