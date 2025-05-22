import { useMyProfile, useProfileList } from '@renderer/entities/profile/model/slice'
import { MessageDto } from '@renderer/shared/lib/socket'

import ProfileIcon from '@renderer/features/auth/ui/ProfileIcon'

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

  const Formatted = new Date(createdAt).toLocaleString()

  return (
    <div className="flex w-full gap-4 text-sm rounded-sm">
      {/* 프사 */}
      <div>
        <div className="size-[40px] overflow-hidden rounded-full">
          <ProfileIcon seed={senderProfile.iconSeed ?? senderProfile.name} />
        </div>
      </div>
      {/* 메세지 영역 */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{senderProfile.name}</span>
          {/* 이 부분 date-fns로 수정 필요 */}
          <span className="text-xs opacity-70">{Formatted}</span>
        </div>
        <span>{content}</span>
      </div>
    </div>
  )
}
