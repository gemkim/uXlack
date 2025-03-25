import { create } from 'zustand'
import type { ProjectDto } from './types'

interface ProjectStore {
  projectList: ProjectDto[]
  selectedProjectId: string | null
  selectedProject: ProjectDto | null
  actions: {
    addProject: (project: ProjectDto) => void
    removeProject: (projectId: string) => void
    setProjectList: (projectList: ProjectDto[]) => void
    setSelectedProjectId: (projectId: string | null) => void
  }
}

const useProjectStore = create<ProjectStore>((set) => ({
  projectList: [],
  selectedProjectId: null,
  selectedProject: null,
  actions: {
    addProject: (project) => set((state) => ({ projectList: [...state.projectList, project] })),
    removeProject: (projectId) =>
      set((state) => ({
        projectList: state.projectList.filter((project) => project.id !== projectId)
      })),
    setProjectList: (projectList) => set({ projectList }),
    setSelectedProjectId: (projectId) =>
      set((state) => ({
        selectedProjectId: projectId,
        selectedProject: state.projectList.find((item) => item.id === projectId)
      }))
  }
}))

export const useProjectList = () => useProjectStore((state) => state.projectList)
export const useSelectedProjectId = () => useProjectStore((state) => state.selectedProjectId)
export const useSelectedProject = () => useProjectStore((state) => state.selectedProject)
export const useProjectActions = () => useProjectStore((state) => state.actions)
