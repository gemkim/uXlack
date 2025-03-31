import { create } from 'zustand'
import { ProfileDto, UserDto } from '../api/types'

interface AuthStore {
  user: UserDto | null
  profile: ProfileDto | null
  actions: {
    setUser: (user: UserDto | null) => void
    setProfile: (profile: ProfileDto | null) => void
  }
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  profile: null,
  actions: {
    setUser: (user) => set({ user }),
    setProfile: (profile) => set({ profile })
  }
}))

export const useProfile = () => useAuthStore((state) => state.profile)
export const useUser = () => useAuthStore((state) => state.user)
export const useAuthActions = () => useAuthStore((state) => state.actions)
