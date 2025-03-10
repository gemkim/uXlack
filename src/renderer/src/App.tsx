import { useEffect } from 'react'
import { Project, useProjectActions } from './entities/project'
import { LandingPage } from './pages/landing'
import { useFetch } from './shared/hooks/useFetch'

function App(): JSX.Element {
  const { data: projectData } = useFetch<Project[]>('project')
  const { setProjectList } = useProjectActions()

  useEffect(() => {
    let ignore = false
    if (!projectData) return

    if (!ignore) {
      setProjectList(projectData)
    }

    return () => {
      ignore = true
    }
  }, [projectData])

  return (
    <>
      {/* <MainPage /> */}
      <LandingPage />
    </>
  )
}

export default App
