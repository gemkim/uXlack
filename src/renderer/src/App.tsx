import Layout from './app/layouts/Layout'
import { useUser } from './entities/auth'
import { LandingPage } from './pages/landing'
import { MainPage } from './pages/main'

function App(): JSX.Element {
  const user = useUser()

  return <Layout>{user ? <MainPage /> : <LandingPage />}</Layout>
}

export default App
