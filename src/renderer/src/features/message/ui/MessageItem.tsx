import { MessageDto } from '@renderer/entities/message/types'
import {
  useMyProfile,
  useProfileList,
  useSelectedProjectProfileList
} from '@renderer/entities/profile/model/slice'

import ProfileIcon from '@renderer/features/profile/ui/ProfileIcon'
import { Button } from '@renderer/shared/ui/Button/Button'
import { format, isSameDay } from 'date-fns'
import { useMemo } from 'react'

interface MessageItemProps {
  message: MessageDto
}

export default function MessageItem(props: MessageItemProps) {
  const { message } = props
  const { senderId, content, createdAt, assigneeIdList } = message

  const myProfile = useMyProfile()
  const profileList = useProfileList()
  const selectedProjectProfileList = useSelectedProjectProfileList()

  const assigneeList = useMemo(() => {
    return selectedProjectProfileList?.filter((p) => assigneeIdList?.includes(p._id))
  }, [assigneeIdList, selectedProjectProfileList])

  if (!myProfile) return

  const senderProfile = [myProfile, ...profileList].find((i) => i._id === senderId)

  if (!senderProfile) return
  if (!createdAt) return

  const currentDate = new Date()
  const _isSameDay = isSameDay(currentDate, new Date(createdAt))
  const Formatted = format(new Date(createdAt), _isSameDay ? 'HH:mm' : 'yyyy.MM.dd HH:mm')

  return (
    <div className='flex w-full gap-4 text-sm rounded-sm break-all'>
      {/* 프사 */}
      <div className='shrink-0'>
        <div className='size-[40px] overflow-hidden rounded-full'>
          <ProfileIcon profile={senderProfile} />
        </div>
      </div>
      {/* 메세지 영역 */}
      <div className='flex-1'>
        <div className='flex items-center gap-2'>
          <span className='font-semibold'>{senderProfile.name}</span>
          {/* 이 부분 date-fns로 수정 필요 */}
          <span className='text-xs opacity-70'>{Formatted}</span>
        </div>
        <div className='flex flex-col gap-1'>
          {assigneeIdList && (
            <div className='flex gap-1 flex-wrap'>
              {assigneeList.map((profile) => (
                <Button
                  key={profile._id}
                  className='text-[12px] !py-0 !px-0.5 shadow-md border whitespace-nowrap'
                  type='button'
                >
                  @ {profile.name}
                </Button>
              ))}
            </div>
          )}

          <span className='whitespace-pre-wrap'>{content}</span>
        </div>
      </div>
    </div>
  )
}
