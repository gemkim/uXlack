import { logoutUser } from '@renderer/entities/auth/api/authApi'
import { useAuthActions } from '@renderer/entities/auth/model/slices'
import { Button } from '@renderer/shared/ui/Button/Button'
import { ReactNode } from 'react'

interface LogoutButtionProps {
  children?: ReactNode
}

export default function LogoutButton(props: LogoutButtionProps) {
  const { children } = props
  const { setProfile } = useAuthActions()

  async function handleOnClick() {
    const res = await logoutUser()

    if (res.status === 500) {
      console.log('log out failed')
    }

    if (res.status === 200) {
      setProfile(null)
      console.log('log out')
    }
  }
  return <Button onClick={handleOnClick}>{children ? children : '로그아웃'}</Button>
}
