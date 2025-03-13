import './shared/base.css'

import { OverlayProvider } from 'overlay-kit'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthDataProvider from './app/provider/AuthDataProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthDataProvider>
    <OverlayProvider>
      <App />
    </OverlayProvider>
  </AuthDataProvider>
)
