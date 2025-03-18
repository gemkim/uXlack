import { TitleFrame } from './app/layouts/TitleFrame'
import { useUser } from './entities/auth'
import { LandingPage } from './pages/landing'
import { MainPage } from './pages/main'

function App(): JSX.Element {
  const user = useUser()

  return <div>{user ? <MainPage /> : <LandingPage />}</div>
}

export default App
