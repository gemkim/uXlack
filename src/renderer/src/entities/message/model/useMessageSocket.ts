import { useMyProfile, useProfileActions } from '@renderer/entities/profile/model/slice'
import { useProjectList } from '@renderer/entities/project/model/slice'
import { ProjectDto } from '@renderer/entities/project/types/types'
import { SOCKET_EVENT } from '@renderer/shared/lib/socket/conetants/socket-event'
import { useSocket } from '@renderer/shared/lib/socket/model/slice'
import { useEffect, useState } from 'react'
import { useMessageActions } from './slice'

export function useMessageSocket() {
  const socket = useSocket()
  const myProfile = useMyProfile()
  const projectList = useProjectList()

  const { addProfileList } = useProfileActions()
  const { addMessage } = useMessageActions()

  const [isReCeiveEventMount, setIsReCeiveEventMount] = useState(false)

  function joinRoomList(projectList: ProjectDto[]) {
    if (!socket) return
    if (projectList.length < 1) return
    if (!myProfile) return

    const projectIdList = projectList.map((project) => project._id)

    const flatProfileIdList = projectList.map((project) => project.memberList).flat()
    const uniqueProfileIdList = [...new Set(flatProfileIdList)].filter(
      (id) => id !== myProfile?._id
    )

    socket.emit(SOCKET_EVENT.joinRooms, projectIdList, uniqueProfileIdList)
    socket.once('profile:get-multiple', (newProfileList) => addProfileList([...newProfileList]))
  }

  /*
  프로젝트 리스트 채팅방 입장
  */
  useEffect(() => {
    if (!projectList || projectList.length < 1) return

    joinRoomList(projectList)
  }, [projectList])

  /*
  메세지 수신 이벤트 등록 
  */
  useEffect(() => {
    if (!socket) return

    if (isReCeiveEventMount) return

    console.log('메세지 수신 이벤트 등록')

    socket.on(SOCKET_EVENT.receiveMessage, (msg) => {
      console.log('서버로 받은 메세지', msg)
      addMessage(msg.projectId, msg)
    })

    setIsReCeiveEventMount(true)

    return () => {
      socket.off(SOCKET_EVENT.receiveMessage)
      setIsReCeiveEventMount(false)
    }
  }, [socket])

  return {}
}
