import { useEffect } from 'react'
import { Project, useProjectActions } from './entities/project'
import { LandingPage } from './pages/landing'
import { useFetch } from './shared/hooks/useFetch'
import { MainPage } from './pages/main'
import { useUser } from './entities/auth'

function App(): JSX.Element {
  const { data: projectData } = useFetch<Project[]>('project')
  const { setProjectList } = useProjectActions()

  const user = useUser()

  useEffect(() => {
    let ignore = false
    if (!projectData) return
    // 여기서 user를 체크하는게 아닌 컴포넌트 분리후 다른 곳에서 체크해야 맥락이 맞을듯
    if (!user) return

    if (!ignore) {
      setProjectList(projectData)
    }

    return () => {
      ignore = true
    }
  }, [projectData])

  return <>{user ? <MainPage /> : <LandingPage />}</>
}

export default App
