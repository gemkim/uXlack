import { MessageDto } from '@renderer/entities/message/types'
import { useMyProfile, useProfileList } from '@renderer/entities/profile/model/slice'

import ProfileIcon from '@renderer/features/profile/ui/ProfileIcon'
import { format, isSameDay } from 'date-fns'

interface ChatMessageProps {
  chat: MessageDto
}

export default function ChatMessage(props: ChatMessageProps) {
  const { chat } = props
  const { senderId, content, createdAt } = chat

  const myProfile = useMyProfile()
  const profileList = useProfileList()

  if (!myProfile) return

  const senderProfile = [myProfile, ...profileList].find((i) => i._id === senderId)

  if (!senderProfile) return
  if (!createdAt) return

  const currentDate = new Date()
  const _isSameDay = isSameDay(currentDate, new Date(createdAt))
  const Formatted = format(new Date(createdAt), _isSameDay ? 'HH:mm' : 'yyyy.MM.dd HH:mm')

  return (
    <div className="flex w-full gap-4 text-sm rounded-sm break-all">
      {/* 프사 */}
      <div className="shrink-0">
        <div className="size-[40px] overflow-hidden rounded-full">
          <ProfileIcon profile={senderProfile} />
        </div>
      </div>
      {/* 메세지 영역 */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{senderProfile.name}</span>
          {/* 이 부분 date-fns로 수정 필요 */}
          <span className="text-xs opacity-70">{Formatted}</span>
        </div>
        <span className="whitespace-pre-wrap">{content}</span>
      </div>
    </div>
  )
}
