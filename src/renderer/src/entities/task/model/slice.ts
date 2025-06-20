import { create } from 'zustand'
import { TaskDto } from '../types'

// export interface ScheduleItemType {
//   id: number;
//   title: string;
//   date: string;
//   color?:string;
// }

// interface ScheduleStoreType {
//   schedule: ScheduleItemType[];
//   actions: {
//     addSchedule: (item: Omit<ScheduleItemType, 'id'>) => void;
//     removeSchedule: (id: number) => void;
//   };
// }

// export const useScheduleStore = create<ScheduleStoreType>((set) => ({
//   schedule: [],
//   actions: {
//     addSchedule: (item) =>
//       set((state) => ({
//         schedule: [
//           ...state.schedule,
//           { ...item, id: Date.now() }
//         ]
//       })),
//     removeSchedule: (id) =>
//       set((state) => ({
//         schedule: state.schedule.filter((s) => s.id !== id)
//       }))
//   }
// }))

// export const useScheduleLists = () => useScheduleStore((state) => state.schedule)
// export const useScheduleActions = () => useScheduleStore((state) => state.actions)

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
