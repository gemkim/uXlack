import {
  useMyProfile,
  useProfileActions,
  useProfileList
} from '@renderer/entities/profile/model/slice'

import { SOCKET_EVENT } from '@renderer/entities/chat/constants/socket-event'
import { useSocket, useSocketActions } from '@renderer/entities/chat/model/slice'

import { useProjectActions } from '@renderer/entities/project/model/slice'
import { ProjectDto } from '@renderer/entities/project/types/types'

import { useFetch } from '@renderer/shared/hooks/useFetch'
import { BASE_URL } from '@renderer/shared/lib/api'
import { ReactNode, useEffect } from 'react'

import { io } from 'socket.io-client'
import { useInviteActions } from '@renderer/entities/invite/model/slice'
import { InviteDto } from '@renderer/entities/invite/types'

interface AuthDataProviderProps {
  children: ReactNode
}

export default function AuthDataProvider(props: AuthDataProviderProps) {
  const { children } = props

  const myProfile = useMyProfile()
  const profileList = useProfileList()

  const { addProfileList } = useProfileActions()
  const { setInviteList } = useInviteActions()

  // 초대 로드
  const { data: inviteDataList } = useFetch<InviteDto[]>(
    'post',
    '/invite/get-received',
    {},
    [myProfile?._id],
    !myProfile?._id
  )

  useEffect(() => {
    if (!inviteDataList) return
    setInviteList(inviteDataList)
  }, [inviteDataList])

  // 프로젝트 로드
  const { addProjectList } = useProjectActions()

  const { data: ProjectDataList } = useFetch<ProjectDto[]>(
    'post',
    '/project/getProjectList',
    { profileId: myProfile?._id },
    [myProfile?._id],
    !myProfile?._id
  )

  useEffect(() => {
    if (!ProjectDataList) return

    addProjectList(ProjectDataList)
    console.log('프로젝트 로딩 완료')
  }, [ProjectDataList])

  // 소켓
  const socket = useSocket()
  const { setSocket } = useSocketActions()

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
    console.log('소켓 연결 완료')
  }, [myProfile])

  // 소켓에 정상 연결 되었을때 채팅방 연결
  useEffect(() => {
    if (!ProjectDataList) return
    if (!socket) return

    const projectIdList = ProjectDataList.map((project) => project._id)

    if (projectIdList.length < 1) {
      console.log('참여 프로젝트가 없어서 채팅 연결 안함')
      return
    }

    const flatProfileIdList = ProjectDataList.map((project) => project.memberList).flat()
    const uniqueProfileIdList = [...new Set(flatProfileIdList)].filter(
      (id) => id !== myProfile?._id
    )

    socket.emit(SOCKET_EVENT.joinRooms, projectIdList, uniqueProfileIdList)

    socket.on('profile:get-multiple', (newProfileList) =>
      addProfileList([...profileList, ...newProfileList])
    )

    console.log(projectIdList, '채팅방 연결')
    //
  }, [socket, ProjectDataList])

  return <>{children}</>
}
