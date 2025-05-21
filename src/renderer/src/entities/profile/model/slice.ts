import { create } from 'zustand'
import { ProfileDto } from '../types'
import { useMemo } from 'react'

interface ProfileStore {
  myProfile: ProfileDto | null
  profileMap: Record<string, ProfileDto>
  actions: {
    setMyProfile: (profile: ProfileDto | null) => void
    addProfileList: (profiles: ProfileDto[]) => void
  }
}

const useProfileStore = create<ProfileStore>((set) => ({
  myProfile: null,
  profileMap: {},
  actions: {
    setMyProfile: (myProfile) => set({ myProfile }),
    addProfileList: (profiles: ProfileDto[]) =>
      set((state) => {
        const updated = { ...state.profileMap }
        profiles.forEach((p) => {
          updated[p._id] = p
        })
        return { profileMap: updated }
      })
  }
}))

export const useMyProfile = () => useProfileStore((state) => state.myProfile)
export const useProfileMap = () => useProfileStore((state) => state.profileMap)
export const useProfileList = () => {
  const profileMap = useProfileStore((state) => state.profileMap)
  return useMemo(() => Object.values(profileMap), [profileMap])
}
export const useProfileById = (id: string) => {
  return useProfileStore((state) => state.profileMap[id])
}

export const useProfileActions = () => useProfileStore((state) => state.actions)
