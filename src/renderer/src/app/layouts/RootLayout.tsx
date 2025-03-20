import { useUser } from '@renderer/entities/auth'
import { MainNavigator } from '@renderer/widget/MainNavigator'
import { Outlet } from 'react-router'

function RootLayout() {
  const user = useUser()

  return (
    <div className="flex">
      <MainNavigator />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
