import { LandingPage } from '@renderer/pages/landing'
import { createBrowserRouter } from 'react-router'

import { HomePage } from '@renderer/pages/home'
import { ProjectPage } from '@renderer/pages/project'
import RootLayout from '../layouts/RootLayout'

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
