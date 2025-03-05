import { create } from 'zustand'
import type { Project } from './types'

interface ProjectStore {
  projectList: Project[]
  selectedProjectId: string | null
  actions: {
    addProject: (project: Project) => void
    removeProject: (projectId: string) => void
    setSelectedProject: (projectId: string | null) => void
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
    setSelectedProject: (projectId) => set({ selectedProjectId: projectId })
  }
}))

export const useProjectList = () => useProjectStore((state) => state.projectList)
export const useProjectActions = () => useProjectStore((state) => state.actions)
