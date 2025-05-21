import './shared/styles/base.css'

import { OverlayProvider } from 'overlay-kit'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import LoaderProvider from './app/providers/LoaderProvider'
import { router } from './app/routes/router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <LoaderProvider>
    <OverlayProvider>
      <RouterProvider router={router} />
    </OverlayProvider>
  </LoaderProvider>
)
