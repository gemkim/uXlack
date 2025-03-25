import { useUser } from '@renderer/entities/auth/model/slices'
import Frame from '@renderer/shared/ui/Frame/Frame'
import WindowController from '@renderer/shared/ui/WindowController/WindowController'
import MainNavigator from '@renderer/widget/MainNavigator/ui/MainNavigator'

import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

function RootLayout() {
  const user = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user])

  return (
    <div className="flex animate-fadeIn h-screen overflow-hidden">
      <MainNavigator />
      <div className="flex-1 flex flex-col max-h-screen h-screen overflow-hidden">
        <Frame className="justify-end">
          <WindowController />
        </Frame>
        <div className="flex-1 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default RootLayout
