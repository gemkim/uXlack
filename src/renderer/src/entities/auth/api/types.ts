export type LoginStatus = 'initial' | 'unauthenticated' | 'authenticated'

export interface LoginDto {
  account: string
  password: string
}

export interface RegisterDto extends LoginDto {
  name: string
}

export interface UserDto extends RegisterDto {
  id: string
  registerAt: number
}
