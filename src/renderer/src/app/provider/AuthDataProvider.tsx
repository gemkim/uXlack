import { useProfile } from '@renderer/entities/auth/model/slices'

import { SOCKET_EVENT } from '@renderer/entities/chat/constants/socket-event'
import { useSocket, useSocketActions } from '@renderer/entities/chat/model/slice'
import { useProjectActions, useProjectList } from '@renderer/entities/project/model/slice'
import { ProjectDto } from '@renderer/entities/project/types/types'

import { API_ENDPOINT } from '@renderer/shared/constants/api-endpoint'

import { useFetch } from '@renderer/shared/hooks/useFetch'
import { ReactNode, useEffect, useState } from 'react'

import { io } from 'socket.io-client'

interface AuthDataProviderProps {
  children: ReactNode
}

export default function AuthDataProvider(props: AuthDataProviderProps) {
  const { children } = props

  const profile = useProfile()

  const [isProjectLoadingDone, setIsProjectLoadingDone] = useState(false)

  const { data: projectListData } = useFetch<ProjectDto[]>(
    API_ENDPOINT.project.getProjectList,
    { params: { profileId: profile?._id } },
    [profile]
  )
  const projectList = useProjectList()
  const { setProjectList } = useProjectActions()

  // 소켓
  const socket = useSocket()
  const { setSocket } = useSocketActions()

  // 초기 프로젝트 로드
  useEffect(() => {
    if (!profile) return
    if (!projectListData) return
    let ignore = false

    if (!ignore) {
      setProjectList(projectListData)
      setIsProjectLoadingDone(true)
    }

    return () => {
      ignore = true
    }
  }, [profile, projectListData])

  // 소켓 연결
  useEffect(() => {
    if (!profile) return
    if (socket) return
    if (!isProjectLoadingDone) return

    const projectIdList = projectList.map((project) => project._id)

    const newSocket = io('http://localhost:4000', {
      query: {
        profileId: profile._id
      }
    })

    newSocket.emit(SOCKET_EVENT.join, projectIdList)
    // newSocket.emit(
    //   SOCKET_EVENT.getAllProjectsMessageList,
    //   projectIdList,
    //   (messageList: ChatMessageDto[]) => {
    //     const projectListDataClone = [...projectListData]

    //     const withMsgProject = projectListDataClone.map((project) => {
    //       return {
    //         ...project,
    //         messageList: messageList.filter((msg) => msg.projectId === project.id)
    //       }
    //     })

    //     setProjectList(withMsgProject)
    //   }
    // )
    setSocket(newSocket)
  }, [projectList.length, profile, socket])

  return <>{children}</>
}
