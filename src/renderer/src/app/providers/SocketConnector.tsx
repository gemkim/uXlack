import { SOCKET_EVENT } from '@renderer/entities/chat/constants/socket-event'
import { useSocket, useSocketActions } from '@renderer/entities/chat/model/slice'
import { useProfileActions } from '@renderer/entities/profile/model/slice'
import { ProfileDto } from '@renderer/entities/profile/types'
import { useProjectList } from '@renderer/entities/project/model/slice'
import { BASE_URL } from '@renderer/shared/lib/api'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

/**
 * 소켓 커넥터도 최초 소켓 인스턴스 생성과 최초 연동에만 관여합니다.
 *
 * 새프로젝트 참여, 탈퇴, 메세지 전송, 초대 전송 등 최초 로그인 이후 발생하는
 *
 * 동작은 useSocket을 사용해 개별적으로 동작합니다.
 */
export default function SocketConnector({ myProfile }: { myProfile: ProfileDto }) {
  const socket = useSocket()
  const { setSocket } = useSocketActions()

  const [hasInit, setHasInit] = useState(false)

  const projectList = useProjectList()
  const { addProfileList } = useProfileActions()

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

  // 소켓에 정상 연결 되었을때 채팅방 연결
  useEffect(() => {
    if (!socket) return
    if (projectList.length < 1) return
    if (hasInit) return

    const projectIdList = projectList.map((project) => project._id)

    const flatProfileIdList = projectList.map((project) => project.memberList).flat()
    const uniqueProfileIdList = [...new Set(flatProfileIdList)].filter(
      (id) => id !== myProfile?._id
    )

    socket.emit(SOCKET_EVENT.joinRooms, projectIdList, uniqueProfileIdList)
    socket.on('profile:get-multiple', (newProfileList) => addProfileList([...newProfileList]))

    setHasInit(true)
  }, [socket, projectList])

  return null
}
