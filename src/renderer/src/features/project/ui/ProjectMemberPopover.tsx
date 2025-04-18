import { useProfile } from '@renderer/entities/auth/model/slices'
import { ProfileDto } from '@renderer/entities/auth/types'
import { useProfileList, useSelectedProject } from '@renderer/entities/project/model/slice'

import ProfileIcon from '@renderer/features/auth/ui/ProfileIcon'
import { IconCheck, IconClose, IconNewUser } from '@renderer/shared/assets/svgs'
import { fetchApi } from '@renderer/shared/lib/api'
import { cn } from '@renderer/shared/lib/utils/utils'

import { PopoverProps } from '@renderer/shared/types/overlayProps'
import { Button } from '@renderer/shared/ui/Button/Button'
import Input from '@renderer/shared/ui/Input/Input'
import LoadingSpinner from '@renderer/shared/ui/LoadingSpinner/LoadingSpinner'
import Popover from '@renderer/shared/ui/Popover/Popover'

import { useEffect, useState } from 'react'

const SEARCH_MSG = {
  default: '예) 홍길동#1234',
  noTag: '태그를 입력해주세요.',
  noProfile: '존재하지 않는 유저 입니다.',
  noValidValue: '올바르지 않은 입력입니다.',
  noTagDigitCollect: '태그는 숫자 4자리 입니다.'
}

export default function ProjectMemberPopover(props: PopoverProps) {
  const myProfile = useProfile()
  const profileList = useProfileList()
  const selectedProject = useSelectedProject()

  const [isInvite, setIsInvite] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchMsg, setSearchMsg] = useState(SEARCH_MSG.default)
  const [searchedProfile, setSearchedProfile] = useState<ProfileDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInviteSuccess, setIsInviteSuccess] = useState(false)

  useEffect(() => {
    if (searchValue === '') {
      setSearchMsg(SEARCH_MSG.default)
      setIsLoading(false)
      return
    }

    const timeoutId = setTimeout(() => {
      console.log(searchValue)

      const split = searchValue.split('#')
      const tag = split[1]

      if (!tag) {
        setSearchMsg(SEARCH_MSG.noTag)
        setIsLoading(false)
        return
      }

      if (split.length > 2) {
        setSearchMsg(SEARCH_MSG.noValidValue)
        setIsLoading(false)
        return
      }
      const name = split[0]

      const tagDigitCollect = tag.length === 4

      if (!tagDigitCollect) {
        setSearchMsg(SEARCH_MSG.noTagDigitCollect)
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      const res = fetchApi
        .post('/profile/get-profile-by-name-tag', { name, tag })
        .then((r) => {
          const profile = r.data.profile[0] as ProfileDto
          setIsInviteSuccess(false)
          setSearchedProfile(profile)
          setIsLoading(false)
        })
        .catch((err) => {
          setSearchMsg(SEARCH_MSG.noProfile)
          setIsLoading(false)
        })
    }, 700)

    // 컴포넌트가 다시 렌더링되거나 unmount될 때 타이머를 정리
    return () => clearTimeout(timeoutId)
  }, [searchValue])

  if (!myProfile) return
  if (!profileList) return
  if (!selectedProject) return

  const memberList = profileList.filter((profile) =>
    selectedProject.memberList.includes(profile._id)
  )

  const projectMemberList = [myProfile, ...memberList]

  function handleToggleClick() {
    setIsInvite((prev) => !prev)
    setSearchValue('')
    setSearchedProfile(null)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value)
  }

  async function handleInviteClick() {
    if (!searchedProfile) return
    if (!selectedProject) return
    const res = await fetchApi.post('/invite/send', {
      inviteeId: searchedProfile?._id,
      projectId: selectedProject._id
    })

    console.log(res)

    // 200 전송 완료
    // 409 이미 초대가 되어 있음
    if (res.status === 200 || res.status === 201) {
      setIsInviteSuccess(true)
    }
  }

  return (
    <Popover {...props}>
      <div className="text-white/70 text-sm min-w-[150px] min-h-[100px] max-w-[200px] flex flex-col">
        <div>
          {!isInvite && (
            <Button onClick={handleToggleClick} className="flex gap-2 items-center w-full">
              <IconNewUser />
              <span>새 멤버</span>{' '}
            </Button>
          )}
          {isInvite && (
            <div className="flex gap-2 items-center">
              <Input placeholder="이름#태그" onChange={handleInputChange} value={searchValue} />
              <Button onClick={handleToggleClick}>
                <IconClose />
              </Button>
            </div>
          )}
        </div>
        <div className="mt-4 flex-1 flex flex-col">
          {!isInvite && <MemberList memberList={projectMemberList} />}
          <div className="flex flex-col h-full flex-1 justify-center">
            {isInvite && (
              <>
                {!isLoading && !searchedProfile && <p className="text-gray-400">{searchMsg}</p>}
                {isLoading && !searchedProfile && <LoadingSpinner />}
              </>
            )}
            {isInvite && searchedProfile && (
              <div className="flex items-center">
                <div className="size-[32px] rounded-full overflow-hidden">
                  <ProfileIcon seed={searchedProfile.iconSeed ?? searchedProfile.name} />
                </div>
                <span className="ml-2">{searchedProfile.name}</span>
                <span className="ml-1 text-gray-400 text-xs">#{searchedProfile.tag}</span>
                <span className="ml-auto">
                  <Button disabled={isInviteSuccess} onClick={handleInviteClick}>
                    {isInviteSuccess ? <IconCheck className="fill-blue-400" /> : <IconNewUser />}
                  </Button>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Popover>
  )
}

interface MemberListProps {
  memberList: ProfileDto[]
}

function MemberList(props: MemberListProps) {
  const { memberList } = props
  return (
    <div className="flex flex-col">
      {memberList.map((profile) => (
        <div className="flex items-center p-2" key={`member-${profile._id}`}>
          <div className="size-[32px] rounded-full overflow-hidden">
            <ProfileIcon seed={profile.iconSeed ?? profile.name} />
          </div>
          <div className="ml-2">
            <span>
              {profile.name}
              <span className="text-xs text-gray-400 ml-1">#{profile.tag}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
