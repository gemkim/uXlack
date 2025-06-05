import { useMyProfile } from '@renderer/entities/profile/model/slice'
import { SOCKET_EVENT } from '@renderer/shared/lib/socket/conetants/socket-event'
import { useSocket } from '@renderer/shared/lib/socket/model/slice'
import { useEffect, useState } from 'react'
import { useInviteActions } from './slice'

export function useInviteSocket() {
  const socket = useSocket()

  const { addInviteList } = useInviteActions()

  const [isReceiveEventMount, setIsReceiveEventMount] = useState(false)

  /*
  메세지 수신 이벤트 등록 
  */
  useEffect(() => {
    if (!socket) return
    if (isReceiveEventMount) return

    console.log('초대 수신 이벤트 등록')

    socket.on(SOCKET_EVENT.receiveInvite, (invite) => {
      console.log('소켓서버로 받은 초대', invite)
      addInviteList([invite])
    })

    setIsReceiveEventMount(true)

    return () => {
      socket.off(SOCKET_EVENT.receiveInvite)
      setIsReceiveEventMount(false)
    }
  }, [socket])

  return {}
}
