import { useMyProfile } from '@renderer/entities/profile/model/slice'

import { ReactNode } from 'react'

import BootstrapLoader from '@renderer/widget/loader/BootstrapLoader'
import SocketConnector from './SocketConnector'

interface LoaderProviderProps {
  children: ReactNode
}

export default function LoaderProvider(props: LoaderProviderProps) {
  const { children } = props

  const myProfile = useMyProfile()

  return (
    <>
      {myProfile && (
        <>
          <BootstrapLoader myProfile={myProfile} />
          <SocketConnector myProfile={myProfile} />
        </>
      )}
      {children}
    </>
  )
}
