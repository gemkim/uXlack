import { create } from 'zustand'
import { ProfileDto } from '../types'
import { useMemo } from 'react'
import { useSelectedProject } from '@renderer/entities/project/model/slice'

interface ProfileStore {
  myProfile: ProfileDto | null
  profileMap: Record<string, ProfileDto>
  actions: {
    setMyProfile: (profile: ProfileDto | null) => void
    addProfileList: (profileList: ProfileDto[]) => void
  }
}

const useProfileStore = create<ProfileStore>((set) => ({
  myProfile: null,
  profileMap: {},
  actions: {
    setMyProfile: (myProfile) => set({ myProfile }),
    addProfileList: (profileList: ProfileDto[]) =>
      set((state) => {
        const updated = { ...state.profileMap }
        profileList.forEach((p) => {
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
export const useSelectedProjectProfileList = () => {
  const selectedProject = useSelectedProject()
  const profileList = useProfileList()

  return useMemo(() => {
    if (!selectedProject) return []
    return profileList.filter((p) => selectedProject?.memberList.includes(p._id))
  }, [profileList, selectedProject])
}

export const useProfileActions = () => useProfileStore((state) => state.actions)
