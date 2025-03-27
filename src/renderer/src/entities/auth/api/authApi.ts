import { fetchApi } from '@renderer/shared/lib/api'
import { UserDto } from './types'
import { AxiosError } from 'axios'

export async function registerUser(userDto: UserDto) {
  try {
    const res = await fetchApi.post('/auth/register-user', userDto)
    return res
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response
    }
    throw new Error('예기치 못한 오류가 발생했습니다.')
  }
}
