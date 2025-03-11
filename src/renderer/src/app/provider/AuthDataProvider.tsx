import { useUser } from '@renderer/entities/auth'
import { ProjectDto, useProjectActions } from '@renderer/entities/project'
import { useFetch } from '@renderer/shared/hooks/useFetch'
import { ReactNode, useEffect } from 'react'

interface AuthDataProviderProps {
  children: ReactNode
}

export default function AuthDataProvider(props: AuthDataProviderProps) {
  const { children } = props

  const user = useUser()
  const { data: projectData } = useFetch<ProjectDto[]>('project', [user])
  const { setProjectList, setSelectedProjectId } = useProjectActions()

  useEffect(() => {
    if (!user) return
    if (!projectData) return
    let ignore = false

    if (!ignore) {
      setProjectList(projectData)
      setSelectedProjectId(projectData[0].id)
    }

    return () => {
      ignore = true
    }
  }, [projectData])

  return <>{children}</>
}
