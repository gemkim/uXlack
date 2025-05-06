import React from 'react'
import { thumbs } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import { useProfile } from '@renderer/entities/auth/model/slices'

interface userAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  seed?: string
}

export default function UserAvatar(props: userAvatarProps) {
  const profile = useProfile()
  if (!profile) return
  const { seed: propsSeed } = props /* props seed 받기 */
  const seed = propsSeed ?? profile.iconSeed /* seed 값 설정정 */

  const avatarSvgStr = createAvatar(thumbs, { seed: seed, scale: 80 })

  return (
    <div
      className='size-full'
      dangerouslySetInnerHTML={{ __html: avatarSvgStr }}
    />
  )
}