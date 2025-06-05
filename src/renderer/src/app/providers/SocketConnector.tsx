import { useInviteSocket } from '@renderer/entities/invite/model/useInviteSocket'
import { useMessageSocket } from '@renderer/entities/message/model/useMessageSocket'
import { ProfileDto } from '@renderer/entities/profile/types'
import { BASE_URL } from '@renderer/shared/lib/api'
import { useSocket, useSocketActions } from '@renderer/shared/lib/socket/model/slice'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

/**
 * 최초 소켓 인스턴스 생성과
 *
 * 각 도메인 별 소켓 커스텀 훅 실행
 */
export default function SocketConnector({ myProfile }: { myProfile: ProfileDto }) {
  const socket = useSocket()
  const { setSocket } = useSocketActions()

  useMessageSocket()
  useInviteSocket()

  useEffect(() => {
    if (!myProfile) return
    if (socket) return

    const newSocket = io(BASE_URL, {
      transports: ['websocket'],
      withCredentials: true,
      query: {
        profileId: myProfile._id
      }
    })

    setSocket(newSocket)
    console.log('최초 소켓 인스턴스 생성 완료')
  }, [myProfile])

  return null
}
