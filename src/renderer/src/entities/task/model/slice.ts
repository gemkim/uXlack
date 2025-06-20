import { create } from 'zustand'
import { TaskDto } from '../types'

// 일정 스토어
interface TaskStore {
  tasks: TaskDto[]
  actions: {
    addTask: (task: TaskDto) => void
    removeTask: (id: string) => void
  }
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  actions: {
    addTask: (task) =>
      set((state) => ({
        tasks: [...state.tasks, task]
      })),
    removeTask: (removeId) =>
      set((state) => ({
        tasks: state.tasks.filter((s) => s._id !== removeId)
      }))
  }
}))

// 원자적 셀렉터 export 하기
export const useTasks = () => useTaskStore((state) => state.tasks)
export const useTaskActions = () => useTaskStore((state) => state.actions)
