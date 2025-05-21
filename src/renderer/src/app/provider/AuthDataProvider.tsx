import { useProfile } from '@renderer/entities/auth/model/slices'
import { ProfileDto } from '@renderer/entities/auth/types'

import { SOCKET_EVENT } from '@renderer/entities/chat/constants/socket-event'
import { useSocket, useSocketActions } from '@renderer/entities/chat/model/socketSlice'
import { useInviteActions } from '@renderer/entities/project/model/inviteSlice'
import { useProfileList, useProjectActions } from '@renderer/entities/project/model/slice'
import { InviteDto, ProjectDto } from '@renderer/entities/project/types/types'

import { useFetch } from '@renderer/shared/hooks/useFetch'
import { BASE_URL } from '@renderer/shared/lib/api'
import { ReactNode, useEffect, useState } from 'react'

import { io } from 'socket.io-client'

interface AuthDataProviderProps {
  children: ReactNode
}

export default function AuthDataProvider(props: AuthDataProviderProps) {
  const { children } = props

  const profile = useProfile()
  const profileList = useProfileList()

  const { setInviteList } = useInviteActions()

  // 초대 로드
  const { data: inviteDataList } = useFetch<InviteDto[]>(
    'post',
    '/invite/get-received',
    {},
    [profile?._id],
    !profile?._id
  )

  useEffect(() => {
    if (!inviteDataList) return
    setInviteList(inviteDataList)
  }, [inviteDataList])

  // 프로젝트 로드
  const { setProjectList, setProfileList } = useProjectActions()
  const { data: ProjectDataList } = useFetch<ProjectDto[]>(
    'post',
    '/project/getProjectList',
    { profileId: profile?._id },
    [profile?._id],
    !profile?._id
  )

  useEffect(() => {
    if (!ProjectDataList) return

    setProjectList(ProjectDataList)
    console.log('프로젝트 로딩 완료')
  }, [ProjectDataList])

  // 소켓
  const socket = useSocket()
  const { setSocket } = useSocketActions()

  useEffect(() => {
    if (!profile) return
    if (socket) return

    const newSocket = io(BASE_URL, {
      transports: ['websocket'],
      withCredentials: true,
      query: {
        profileId: profile._id
      }
    })

    setSocket(newSocket)
    console.log('소켓 연결 완료')
  }, [profile])

  // 소켓에 정상 연결 되었을때 채팅방 연결
  useEffect(() => {
    if (!ProjectDataList) return
    if (!socket) return

    const projectIdList = ProjectDataList.map(project => project._id)

    if (projectIdList.length < 1) {
      console.log('참여 프로젝트가 없어서 채팅 연결 안함')
      return
    }

    const flatProfileIdList = ProjectDataList.map(project => project.memberList).flat()
    const uniqueProfileIdList = [...new Set(flatProfileIdList)].filter(id => id !== profile?._id)

    socket.emit(SOCKET_EVENT.joinRooms, projectIdList, uniqueProfileIdList)

    socket.on('profile:get-multiple', newProfileList =>
      setProfileList([...profileList, ...newProfileList])
    )

    console.log(projectIdList, '채팅방 연결')
    //
  }, [socket, ProjectDataList])

  return <>{children}</>
}
