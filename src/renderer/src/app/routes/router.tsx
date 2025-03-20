import { LandingPage } from '@renderer/pages/landing'
import { createBrowserRouter } from 'react-router'

import ProjectLayout from '../layouts/ProjectLayout'
import RootLayout from '../layouts/RootLayout'
import { ProjectPage } from '@renderer/pages/project'
import { HomePage } from '@renderer/pages/home'

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
