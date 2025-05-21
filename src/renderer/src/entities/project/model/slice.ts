import { create } from 'zustand'
import { ProjectDto } from '../types/types'
import { useMemo } from 'react'

interface ProjectStore {
  projectMap: Record<string, ProjectDto>
  selectedProjectId: string | null

  actions: {
    addProjectList: (projectList: ProjectDto[]) => void
    removeProject: (projectId: string) => void
    setSelectedProjectId: (projectId: string | null) => void
  }
}

const useProjectStore = create<ProjectStore>((set) => ({
  projectMap: {},
  selectedProjectId: null,

  actions: {
    addProjectList: (projectList: ProjectDto[]) =>
      set((state) => {
        const updated = { ...state.projectMap }
        projectList.forEach((p) => {
          updated[p._id] = p
        })
        return { projectMap: updated }
      }),
    removeProject: (projectId: string) =>
      set((state) => {
        const updated = { ...state.projectMap }
        delete updated[projectId]

        const selectedProjectId =
          state.selectedProjectId === projectId ? null : state.selectedProjectId

        return { projectMap: updated, selectedProjectId }
      }),
    setSelectedProjectId: (selectedProjectId) => set({ selectedProjectId })
  }
}))

export const useProjectList = () => {
  const projectMap = useProjectStore((state) => state.projectMap)
  return useMemo(() => Object.values(projectMap), [projectMap])
}

export const useSelectedProject = () => {
  return useProjectStore((state) =>
    state.selectedProjectId ? state.projectMap[state.selectedProjectId] : null
  )
}

export const useProjectActions = () => useProjectStore((state) => state.actions)
