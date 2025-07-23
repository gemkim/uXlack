import { TaskDto } from '../types'
import { API_ENDPOINT } from '../../../shared/constants/api-endpoint'
import { fetchApi } from '../../../shared/lib/api'

export const taskApi = {
  //  getList: async (): Promise<TaskDto[]> => { 등록한 일정 리스트를 가져오는 API란?!
  //   try {
  //     const res = await fetchApi.get(API_ENDPOINT.task.getList)
  //     console.log('일정 목록:', res.data)
  //     return res.data
  //   } catch (error: any) {
  //     throw new Error(error.response.data.message || '일정 목록 조회 실패')
  //   }
  // },
  create: async (data: TaskDto): Promise<TaskDto> => {
    try {
      const res = await fetchApi.post(API_ENDPOINT.task.create, data)
      console.log('요청 데이터:', res.data)
      return res.data
    } catch (error: any) {
      throw new Error(error.response.data.message || '일정 생성 실패')
    }
  }
  // update: async (taskId: string, data: Partial<TaskDto>): Promise<TaskDto> => {
  //   try {
  //     const res = await fetchApi.put(API_ENDPOINT.task.update, { taskId, ...data })
  //     return res.data
  //   } catch (error: any) {
  //     throw new Error(error.response.data.message || '일정 수정 실패')
  //   }
  // },
  // delete: async (taskId: string): Promise<void> => {
  //   try {
  //     await fetchApi.delete(API_ENDPOINT.task.delete, { data: { taskId } })
  //     console.log('일정 삭제 완료:', taskId)
  //   } catch (error: any) {
  //     throw new Error(error.response.data.message || '일정 삭제 실패')
  //   }
  // },
}
