import { create } from 'zustand'
import { DefaultEventsMap } from 'socket.io'
import { Socket } from 'socket.io-client'

interface SocketStore {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null
  actions: {
    setSocket: (socket: Socket<DefaultEventsMap, DefaultEventsMap> | null) => void
  }
}

const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  actions: {
    setSocket: (socket) => set({ socket })
  }
}))

export const useSocket = () => useSocketStore((state) => state.socket)
export const useSocketActions = () => useSocketStore((state) => state.actions)
