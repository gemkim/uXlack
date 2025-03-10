import { create } from 'zustand'
import { UserDto } from '../api/types'

interface AuthStore {
  user: UserDto | null
  actions: {
    setUser: (user: UserDto | null) => void
  }
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  actions: {
    setUser: (user) => set({ user })
  }
}))

export const useUser = () => useAuthStore((state) => state.user)
export const useAuthActions = () => useAuthStore((state) => state.actions)
