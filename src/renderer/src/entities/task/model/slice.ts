import { create } from 'zustand'
import { TaskDto, CreateTaskDto } from '../types'
import { taskApi } from '../api/taskApi'

// 일정 스토어
interface TaskStore {
  tasks: TaskDto[]
  actions: {
    addTask: (task: TaskDto) => void
  }
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  actions: {
    addTask: (task) =>
      set((state) => ({
        tasks: [...state.tasks, task]
      }))
  }
}))

// 원자적 셀렉터 export 하기
export const useTasks = () => useTaskStore((state) => state.tasks)
export const useTaskActions = () => useTaskStore((state) => state.actions)

export const createTask = async (data: CreateTaskDto): Promise<TaskDto> => {
  const { addTask } = useTaskStore.getState().actions
  // console.log('추가 데이터:', data)
  const newTask = await taskApi.create(data)
  // console.log('추가 데이터:', newTask)
  addTask(newTask)
  console.log('스토어 저장 목록:', useTaskStore.getState().tasks)
  return newTask
}
