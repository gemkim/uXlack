import { createBrowserRouter } from 'react-router'

import RootLayout from '../layouts/RootLayout'
import LandingPage from '@renderer/pages/landing/ui/Page/Page'
import ProjectPage from '@renderer/pages/project/ui/Page/Page'
import HomePage from '@renderer/pages/home/ui/Page/Page'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage
  },
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        path: '/home',
        Component: HomePage
      },
      {
        path: '/project/:projectId',
        Component: ProjectPage
      }
    ]
  }
])
