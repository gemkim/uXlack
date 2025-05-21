import { thumbs } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import { useMyProfile } from '@renderer/entities/profile/model/slice'
import { cn } from '@renderer/shared/lib/utils/utils'
import React from 'react'

interface ProfileIconProps extends React.HTMLAttributes<HTMLDivElement> {
  seed?: string
}

export default function ProfileIcon(props: ProfileIconProps) {
  const { className, seed: propsSeed } = props
  const myProfile = useMyProfile()

  if (!myProfile) return

  const seed = propsSeed ?? myProfile.iconSeed ?? myProfile.name
  const avatarSvgStr = createAvatar(thumbs, { seed: seed, scale: 70 }).toString()

  return (
    <div
      className={cn('size-full', className)}
      dangerouslySetInnerHTML={{ __html: avatarSvgStr }}
    />
  )
}
