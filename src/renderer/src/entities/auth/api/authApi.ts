import { fetchApi } from '@renderer/shared/lib/api'
import { UserDto } from './types'

export async function createUserAccount(userDto: UserDto) {
  try {
    const res = await fetchApi.post('/user', userDto)

    return res
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { status: 400 }
    }
    return { status: 500 }
  }
}
