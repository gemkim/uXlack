import { create } from 'zustand'

export interface ToastItem {
  id: number
  visible: boolean
  message: string
  type: 'base' | 'success' | 'error'
}

interface ToastState {
  toasts: ToastItem[]
  nextId: number
}

interface ToastActions {
  setToasts: (toasts: ToastItem[] | ((prev: ToastItem[]) => ToastItem[])) => void
  incrementId: () => void
  getNextId: () => number
}

interface ToastStore {
  state: ToastState
  actions: ToastActions
}

export const useToastStore = create<ToastStore>((set, get) => ({
  state: {
    toasts: [],
    nextId: 1
  },
  actions: {
    setToasts: (updater) => {
      set((store) => {
        const newToasts = typeof updater === 'function' ? updater(store.state.toasts) : updater

        return {
          state: {
            ...store.state,
            toasts: newToasts
          }
        }
      })
    },
    incrementId: () => {
      set((store) => ({
        state: {
          ...store.state,
          nextId: store.state.nextId + 1
        }
      }))
    },
    getNextId: () => get().state.nextId
  }
}))
