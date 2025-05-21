import { create } from 'zustand'
import { InviteDto } from '../types'

interface InviteStore {
  inviteList: InviteDto[]
  actions: {
    setInviteList: (inviteList: InviteDto[]) => void
  }
}

const useInviteStore = create<InviteStore>((set) => ({
  inviteList: [],
  actions: {
    setInviteList: (inviteList) => set({ inviteList })
  }
}))

export const useInviteList = () => useInviteStore((state) => state.inviteList)
export const useInviteActions = () => useInviteStore((state) => state.actions)
