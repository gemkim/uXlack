import { useMyProfile } from '@renderer/entities/profile/model/slice'

import { ReactNode } from 'react'

import InviteLoader from '@renderer/widget/loader/InviteLoader'
import ProjectLoader from '@renderer/widget/loader/ProjectLoader'
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
          <InviteLoader myProfile={myProfile} />
          <ProjectLoader myProfile={myProfile} />
          <SocketConnector myProfile={myProfile} />
        </>
      )}
      {children}
    </>
  )
}
