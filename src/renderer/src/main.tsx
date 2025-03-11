import './shared/base.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { OverlayProvider } from 'overlay-kit'
import AuthDataProvider from './app/provider/AuthDataProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthDataProvider>
      <OverlayProvider>
        <App />
      </OverlayProvider>
    </AuthDataProvider>
  </React.StrictMode>
)
