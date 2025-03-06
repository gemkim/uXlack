import { create } from 'zustand'
import type { Project } from './types'

interface ProjectStore {
  projectList: Project[]
  selectedProjectId: string | null
  actions: {
    addProject: (project: Project) => void
    removeProject: (projectId: string) => void
    setProjectList: (projectList: Project[]) => void
    setSelectedProjectId: (projectId: string | null) => void
  }
}

const useProjectStore = create<ProjectStore>((set) => ({
  projectList: [],
  selectedProjectId: null,
  actions: {
    addProject: (project) => set((state) => ({ projectList: [...state.projectList, project] })),
    removeProject: (projectId) =>
      set((state) => ({
        projectList: state.projectList.filter((project) => project.id !== projectId)
      })),
    setProjectList: (projectList) => set({ projectList }),
    setSelectedProjectId: (projectId) => set({ selectedProjectId: projectId })
  }
}))

export const useProjectList = () => useProjectStore((state) => state.projectList)
export const useSelectedProjectId = () => useProjectStore((state) => state.selectedProjectId)
export const useProjectActions = () => useProjectStore((state) => state.actions)
