import { create } from 'zustand'
import { InviteDto } from '../types'

interface InviteStore {
  inviteList: InviteDto[]
  actions: {
    addInviteList: (inviteList: InviteDto[]) => void
    setInviteList: (inviteList: InviteDto[]) => void
  }
}

const useInviteStore = create<InviteStore>((set) => ({
  inviteList: [],
  actions: {
    addInviteList: (inviteList) =>
      set((state) => ({ inviteList: [...state.inviteList, ...inviteList] })),
    setInviteList: (inviteList) => set({ inviteList })
  }
}))

export const useInviteList = () => useInviteStore((state) => state.inviteList)
export const useInviteActions = () => useInviteStore((state) => state.actions)
