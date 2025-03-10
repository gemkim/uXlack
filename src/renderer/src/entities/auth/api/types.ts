export type LoginStatus = 'initial' | 'unauthenticated' | 'authenticated'

export interface RegisterDto {
  name: string
  account: string
  password: string
}

export interface UserDto extends RegisterDto {
  id: string
  registerAt: number
}
