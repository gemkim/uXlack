import { useUser } from '@renderer/entities/auth'
import { MainNavigator } from '@renderer/widget/MainNavigator'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

function Layout(props: LayoutProps) {
  const { children } = props
  const user = useUser()

  return (
    <div className="flex">
      {user && <MainNavigator />}
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default Layout
