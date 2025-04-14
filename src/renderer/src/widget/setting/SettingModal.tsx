import { useProfile, useUser } from '@renderer/entities/auth/model/slices'
import { ProfileDto } from '@renderer/entities/auth/types'
import LogoutButton from '@renderer/features/auth/ui/LogoutButton'
import { IconQuestion } from '@renderer/shared/assets/svgs'
import { useHandleOption } from '@renderer/shared/hooks/useHandleOption'
import { cn } from '@renderer/shared/lib/utils/utils'

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

  const user = useUser()
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
          {selectedOption.name === 'profile' && <Profile profile={profile} />}
          {selectedOption.name === 'setting' && <Setting />}
        </div>
      </div>
    </Modal>
  )
}

function Profile({ profile }: { profile: ProfileDto | null }) {
  const [isProfileEditing, setIsProfileEditing] = useState(false)

  if (!profile) return
  const { name } = profile

  function handleProfileImageClick() {
    setIsProfileEditing((prev) => !prev)
  }

  return (
    <div className="flex flex-col px-4 size-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-bold">프로필 이미지</label>
          <div className="flex flex-col">
            <div
              onClick={handleProfileImageClick}
              className="size-[112px] overflow-hidden rounded-full border flex items-center justify-center cursor-pointer hover:brightness-75 transition-all"
            >
              <span>프로필 이미지 영역</span>
            </div>
            <div
              className={cn(
                'mt-2 transition-all overflow-hidden',
                isProfileEditing ? 'max-h-[500px]' : 'max-h-0'
              )}
            >
              {/* <div className="flex justify-center gap-2">
                <button>전</button>
                <button>무작위</button>
                <button>후</button>
              </div> */}
              {/* <div className="flex flex-col">
                <div className="flex">
                  <div className="flex-1">eye</div>
                  <div className="flex-1">mouth</div>
                  <div className="flex-1">shape color</div>
                  <div className="flex-1">translateY (character)</div>
                </div>
                <div className="flex">
                  <div className="flex-1">filp</div>
                  <div className="flex-1">rotate</div>
                  <div className="flex-1">scale</div>
                </div>
                <div className="flex">
                  <div className="flex-1">bg type</div>
                  <div className="flex-1">bg color</div>
                  <div className="flex-1">translateX (character)</div>
                  <div className="flex-1">translateY (character)</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold">이름</label>
          <Input value={name} disabled />
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
