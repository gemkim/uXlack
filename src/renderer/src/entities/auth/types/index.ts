export type LoginStatus = 'initial' | 'unauthenticated' | 'authenticated'

export interface UserDto {
  account: string
  password: string
  _id?: string
  createdAt?: string
  updatedAt: string
}

export interface ProfileDto {
  _id: string
  accountId: string
  name: string
  projectList: string[]
  iconSeed?: string
}
