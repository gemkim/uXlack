import { fetchApi } from '@renderer/shared/lib/api'
import { UserDto } from './types'
import { AxiosError } from 'axios'

export async function createUserAccount(userDto: UserDto) {
  try {
    const res = await fetchApi.post('/user', userDto)
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
