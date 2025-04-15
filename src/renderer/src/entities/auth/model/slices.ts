import { create } from 'zustand'
import { ProfileDto } from '../types'

interface AuthStore {
  profile: ProfileDto | null
  actions: {
    setProfile: (profile: ProfileDto | null) => void
  }
}

const useAuthStore = create<AuthStore>((set) => ({
  profile: null,
  actions: {
    setProfile: (profile) => set({ profile })
  }
}))

export const useProfile = () => useAuthStore((state) => state.profile)
export const useAuthActions = () => useAuthStore((state) => state.actions)
