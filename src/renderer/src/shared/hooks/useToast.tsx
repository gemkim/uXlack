import { useToastStore } from '@renderer/entities/toast/model/slice'

export const useToast = () => {
  const toasts = useToastStore((s) => s.state.toasts)
  const setToasts = useToastStore((s) => s.actions.setToasts)
  const getNextId = useToastStore((s) => s.actions.getNextId)
  const incrementId = useToastStore((s) => s.actions.incrementId)

  const addToast = (message: string, type: 'base' | 'success' | 'error' = 'base', timer = 2000) => {
    const id = getNextId()
    incrementId()

    const newToast = {
      id,
      visible: true,
      message,
      type
    }

    setToasts((prev) => [...prev, newToast])
    setTimeout(() => {
      // 안보이게
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, visible: false } : t)))
      setTimeout(() => {
        // 목록 삭제
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 500)
    }, timer)
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const clearToasts = () => {
    setToasts([])
  }

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts
  }
}
