import { fetchApi } from '@renderer/shared/lib/api'

import { AxiosError } from 'axios'
import { UserDto } from '../types'
import { API_ENDPOINT } from '@renderer/shared/constants/api-endpoint'

export async function registerUser(userDto: UserDto) {
  try {
    const res = await fetchApi.post(API_ENDPOINT.auth.registerUser, userDto)
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
    const res = await fetchApi.post(API_ENDPOINT.auth.login, { account, password })
    return res
  } catch (error: any) {
    return error.response
  }
}

export async function logoutUser() {
  try {
    const res = await fetchApi.post(API_ENDPOINT.auth.logout)
    return res
  } catch (error: any) {
    return error.response
  }
}

export async function updateProfileName(newName: string) {
  try {
    const res = await fetchApi.put(API_ENDPOINT.profile.updateName, { name: newName })
    return res
  } catch (error: any) {
    return error.response
  }
}

export async function updateProfileIconSeed(newIconSeed: string) {
  try {
    const res = await fetchApi.put(API_ENDPOINT.profile.updateIcon, { iconSeed: newIconSeed })
    return res
  } catch (error: any) {
    return error.response
  }
}
