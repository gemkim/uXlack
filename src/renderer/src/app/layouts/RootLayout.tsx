import { useMyProfile } from '@renderer/entities/profile/model/slice'
import Frame from '@renderer/shared/ui/Frame/Frame'
import { Toast } from '@renderer/shared/ui/Toast/Toast'
import WindowController from '@renderer/shared/ui/WindowController/WindowController'
import MainNavigator from '@renderer/widget/navigation/MainNavigator'
import { useEffect } from 'react'

import { Outlet, useNavigate } from 'react-router'

function RootLayout() {
  const navigate = useNavigate()
  const myProfile = useMyProfile()

  useEffect(() => {
    if (myProfile) return

    navigate('/')
  }, [myProfile])

  return (
    <div className='flex animate-fadeIn h-screen overflow-hidden'>
      <MainNavigator />
      <div className='flex-1 flex flex-col max-h-screen h-screen overflow-hidden'>
        <div className='border-b flex items-center max-h-[50px]'>
          <Frame className='justify-end border-b-0'></Frame>
          <div className='pr-4'>
            <WindowController />
          </div>
        </div>
        <div className='flex-1 min-h-0 overflow-auto'>
          <Outlet />
        </div>
        <Toast />
      </div>
    </div>
  )
}

export default RootLayout
