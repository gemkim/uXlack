import { useUser } from '@renderer/entities/auth'
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
    <div className="flex animate-fadeIn">
      <MainNavigator />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
