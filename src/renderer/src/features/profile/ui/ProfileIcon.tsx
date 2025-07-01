import { thumbs } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import { ProfileDto } from '@renderer/entities/profile/types'
import { cn } from '@renderer/shared/lib/utils/utils'
import React from 'react'

interface ProfileIconProps extends React.HTMLAttributes<HTMLDivElement> {
  profile?: ProfileDto
  seed?: string
}

/**
 * @param props.profile 프로필 정보 (optional)
 * @param props.seed 프로필 아이콘 시드 (optional)
 *
 * profileDto 또는 seed 중 하나를 전달 받아 아이콘을 표시
 *
 * profileDto를 전달 받은 경우 클릭 이벤트로 프로필 Popover 오버레이 토글
 */
export default function ProfileIcon(props: ProfileIconProps) {
  const { className, seed: _seed, profile } = props

  if (!_seed && !profile) return

  const avatarSvgStr = createAvatar(thumbs, {
    seed: _seed ?? profile?.iconSeed ?? profile?.name,
    scale: 70
  }).toString()

  function handleIconClick() {
    if (!profile) return

    console.log(profile, 'profile')
    // togglePopover(SettingModal, event, 'setting-modal')
  }

  return (
    <div
      onClick={handleIconClick}
      className={cn(
        'size-full',
        className,
        profile && 'cursor-pointer hover:brightness-75 transition-all'
      )}
      dangerouslySetInnerHTML={{ __html: avatarSvgStr }}
    />
  )
}
