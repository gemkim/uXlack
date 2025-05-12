import { updateProfileIconSeed } from '@renderer/entities/auth/api/authApi'
import { useAuthActions, useProfile } from '@renderer/entities/auth/model/slices'
import { ProfileDto } from '@renderer/entities/auth/types'
import LogoutButton from '@renderer/features/auth/ui/LogoutButton'
import ProfileIcon from '@renderer/features/auth/ui/ProfileIcon'
import {
  IconCaretRight,
  IconCheck,
  IconDice,
  IconQuestion,
  IconReturn
} from '@renderer/shared/assets/svgs'
import { useHandleOption } from '@renderer/shared/hooks/useHandleOption'
import { cn, generateString } from '@renderer/shared/lib/utils/utils'

import { OverlayProps } from '@renderer/shared/types/overlayProps'
import { Button } from '@renderer/shared/ui/Button/Button'
import Input from '@renderer/shared/ui/Input/Input'
import Modal from '@renderer/shared/ui/Modal/Modal'
import { useState } from 'react'
const SETTING_CONTENTS = [
  { name: 'profile', label: '내 프로필' },
  { name: 'setting', label: '설정 ' }
] as const

export default function SettingModal(props: OverlayProps) {
  const { setSelectedOptionByKey, isSelectedOption, selectedOption, optionNames } = useHandleOption(
    SETTING_CONTENTS,
    (p) => p.name
  )

  const profile = useProfile()

  function handleOptionClick(name: (typeof optionNames)[number]) {
    switch (name) {
      case 'profile':
        setSelectedOptionByKey('profile')
        break
      case 'setting':
        setSelectedOptionByKey('setting')
    }
  }

  return (
    <Modal {...props}>
      <div className="w-[80vw] h-[80vh] flex">
        {/* 메뉴 패널 */}
        <div className="border-r pr-4 h-full min-w-[120px] flex flex-col gap-0.5">
          {SETTING_CONTENTS.map((option) => (
            <Button
              key={option.name}
              isActive={isSelectedOption(option)}
              onClick={() => handleOptionClick(option.name)}
            >
              {option.label}
            </Button>
          ))}

          <Button className="mt-auto">
            <IconQuestion />
            도움말
          </Button>
        </div>
        {/* 컨텐츠 패널 */}
        <div className="flex-1">
          {selectedOption.name === 'profile' && profile && <Profile profile={profile} />}
          {selectedOption.name === 'setting' && <Setting />}
        </div>
      </div>
    </Modal>
  )
}

function Profile({ profile }: { profile: ProfileDto }) {
  const [isProfileEditing, setIsProfileEditing] = useState(false)

  const { name, iconSeed, tag } = profile
  const defaultSeed = iconSeed ?? name
  const [seed, setSeed] = useState(defaultSeed)

  const { setProfile } = useAuthActions()

  function handleProfileImageClick() {
    setIsProfileEditing((prev) => !prev)
    setSeed(defaultSeed)
  }

  function hnadleProfileRandomClick() {
    setSeed(generateString(4))
  }

  function handleReturnClick() {
    setSeed(defaultSeed)
    setIsProfileEditing(false)
  }

  async function handleProfileSubmitClick() {
    console.log('적용')
    const res = await updateProfileIconSeed(seed)

    const newProfile = res.data.profile as ProfileDto

    if (!newProfile) return

    setProfile(newProfile)
    setIsProfileEditing(false)

    // 백엔드 개발 후 추가 예정
  }

  return (
    <div className="flex flex-col px-4 size-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-bold">프로필 이미지</label>
          <div className="flex gap-4">
            <div
              onClick={handleProfileImageClick}
              className="size-[112px] overflow-hidden rounded-full border flex items-center justify-center cursor-pointer hover:brightness-75 transition-all"
            >
              <ProfileIcon seed={seed} />
            </div>
            <div
              className={cn(
                'flex-1 flex items-end transition-opacity',
                isProfileEditing ? 'opacity-100' : 'opacity-0 pointer-events-none'
              )}
            >
              <div className="flex gap-4">
                <Button onClick={hnadleProfileRandomClick}>
                  <IconDice />
                </Button>
                <div className="flex gap-2">
                  <Button onClick={handleReturnClick}>
                    <IconReturn />
                  </Button>
                  <Button onClick={handleProfileSubmitClick}>
                    <IconCheck />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 basis-1/3">
            <label className="font-bold">이름</label>
            <Input value={name} disabled />
          </div>
          <div className="flex flex-col gap-2 basis-1/3">
            <label className="font-bold">태그</label>
            <Input value={`#${tag}`} disabled />
          </div>
        </div>
      </div>
      <div className="mt-auto flex justify-end">
        <LogoutButton />
      </div>
    </div>
  )
}

function Setting() {
  return <div className="px-4">세팅</div>
}
