import { useUser } from '@renderer/entities/auth'
import { useSocket, useSocketActions } from '@renderer/entities/chat'
import { SOCKET_EVENT } from '@renderer/entities/chat/constants/socket-event'
import { ProjectDto, useProjectActions } from '@renderer/entities/project'
import { useFetch } from '@renderer/shared/hooks/useFetch'
import { ReactNode, useEffect } from 'react'
import { io } from 'socket.io-client'

interface AuthDataProviderProps {
  children: ReactNode
}

export default function AuthDataProvider(props: AuthDataProviderProps) {
  const { children } = props

  // 유저
  const user = useUser()
  // 프로젝트
  const { data: projectData } = useFetch<ProjectDto[]>('project', [user])
  const { setProjectList, setSelectedProjectId } = useProjectActions()

  // 소켓
  const socket = useSocket()
  const { setSocket } = useSocketActions()

  // 초기 프로젝트 로드
  useEffect(() => {
    if (!user) return
    if (!projectData) return
    let ignore = false

    if (!ignore) {
      setProjectList(projectData)
      if (projectData[0]) {
        setSelectedProjectId(projectData[0].id)
      }
    }

    return () => {
      ignore = true
    }
  }, [projectData])

  // 소켓 연결
  useEffect(() => {
    if (!user) return
    if (socket) return
    if (!projectData) return

    const projectIdList = projectData.map((project) => project.id)

    const newSocket = io('http://localhost:4000', {
      query: {
        userId: user.id
      }
    })

    newSocket.emit(SOCKET_EVENT.join, projectIdList)

    setSocket(newSocket)
  }, [user, socket])

  return <>{children}</>
}
