import { create } from 'zustand'
import { MessageDto } from '../types'

interface MessageStore {
  messageListByProjectId: Record<string, MessageDto[]>
  actions: {
    setMessageList: (projectId: string, messageList: MessageDto[]) => void
    addMessage: (projectId: string, message: MessageDto) => void
    clearMessageList: (projectId: string) => void
  }
}

const useMessageStore = create<MessageStore>((set) => ({
  messageListByProjectId: {},

  actions: {
    setMessageList: (projectId, messageList) =>
      set((state) => ({
        messageListByProjectId: {
          ...state.messageListByProjectId,
          [projectId]: messageList
        }
      })),

    addMessage: (projectId, message) =>
      set((state) => ({
        messageListByProjectId: {
          ...state.messageListByProjectId,
          [projectId]: [...(state.messageListByProjectId[projectId] || []), message]
        }
      })),

    clearMessageList: (projectId) =>
      set((state) => {
        const newMap = { ...state.messageListByProjectId }
        delete newMap[projectId]
        return { messageListByProjectId: newMap }
      })
  }
}))

export const useMessageListByProjectId = () =>
  useMessageStore((state) => state.messageListByProjectId)
export const useMessageActions = () => useMessageStore((state) => state.actions)
