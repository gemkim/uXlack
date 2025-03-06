import { useEffect } from 'react'
import { MainPage } from './pages/main'
import { useFetch } from './shared/hooks/useFetch'
import { Project, useProjectActions } from './entities/project'

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
      <MainPage />
    </>
  )
}

export default App
