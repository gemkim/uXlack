import './shared/styles/base.css'

import { OverlayProvider } from 'overlay-kit'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import AuthDataProvider from './app/provider/AuthDataProvider'
import { router } from './app/routes/router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthDataProvider>
    <OverlayProvider>
      <RouterProvider router={router} />
    </OverlayProvider>
  </AuthDataProvider>
)
