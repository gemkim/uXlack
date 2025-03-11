import { useUser } from './entities/auth'
import { LandingPage } from './pages/landing'
import { MainPage } from './pages/main'

function App(): JSX.Element {
  const user = useUser()

  return <>{user ? <MainPage /> : <LandingPage />}</>
}

export default App
