import { create } from 'zustand'
import { ProjectDto } from '../types/types'
import { ProfileDto } from '@renderer/entities/auth/types'

interface ProjectStore {
  projectList: ProjectDto[]
  selectedProjectId: string | null
  selectedProject: ProjectDto | null
  profileList: ProfileDto[]
  actions: {
    addProject: (project: ProjectDto) => void
    removeProject: (projectId: string) => void
    setProjectList: (projectList: ProjectDto[]) => void
    setSelectedProjectId: (projectId: string | null) => void
    setProfileList: (profileList: ProfileDto[]) => void
  }
}

const useProjectStore = create<ProjectStore>((set) => ({
  projectList: [],
  selectedProjectId: null,
  selectedProject: null,
  profileList: [],
  actions: {
    addProject: (project) => set((state) => ({ projectList: [...state.projectList, project] })),
    removeProject: (projectId) =>
      set((state) => ({
        projectList: state.projectList.filter((project) => project._id !== projectId)
      })),
    setProjectList: (projectList) => set({ projectList }),
    setSelectedProjectId: (projectId) =>
      set((state) => ({
        selectedProjectId: projectId,
        selectedProject: state.projectList.find((item) => item._id === projectId)
      })),
    setProfileList: (profileList) => set({ profileList })
  }
}))

export const useProjectList = () => useProjectStore((state) => state.projectList)
export const useProfileList = () => useProjectStore((state) => state.profileList)
export const useSelectedProjectId = () => useProjectStore((state) => state.selectedProjectId)
export const useSelectedProject = () => useProjectStore((state) => state.selectedProject)
export const useProjectActions = () => useProjectStore((state) => state.actions)
