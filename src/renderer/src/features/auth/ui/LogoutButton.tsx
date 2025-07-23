import { logoutUser } from '@renderer/entities/auth/api/authApi'
import { useProfileActions } from '@renderer/entities/profile/model/slice'
import useOverlay from '@renderer/shared/hooks/useOverlay'

import { Button } from '@renderer/shared/ui/Button/Button'
import { ReactNode } from 'react'

interface LogoutButtionProps {
  children?: ReactNode
}

export default function LogoutButton(props: LogoutButtionProps) {
  const { children } = props
  const { setMyProfile } = useProfileActions()

  const { closeAllOverlay } = useOverlay()

  async function handleOnClick() {
    const res = await logoutUser()

    if (res.status === 500) {
      console.log('log out failed')
    }

    if (res.status === 200) {
      setMyProfile(null)
      console.log('log out')
    }

    closeAllOverlay()
  }
  return (
    <Button onClick={handleOnClick} className='text-red-300 font-semibold'>
      {children ? children : '로그아웃'}
    </Button>
  )
}
