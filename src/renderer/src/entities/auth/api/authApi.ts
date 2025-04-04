import { fetchApi } from '@renderer/shared/lib/api'

import { AxiosError } from 'axios'
import { UserDto } from '../types'

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

export async function loginUser(userDto: UserDto) {
  const { account, password } = userDto

  try {
    const res = await fetchApi.post(`/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // 세션 쿠키 포함
      data: { account, password }
    })
    return res
  } catch (error: any) {
    return error.response
  }
}

export async function logoutUser() {
  try {
    const res = await fetchApi.post(`/auth/logout`, {
      method: 'POST',
      credentials: 'include' // 세션 쿠키 포함
    })
    return res
  } catch (error) {
    return error.response
  }
}
