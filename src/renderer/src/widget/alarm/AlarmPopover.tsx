import { useInviteList } from '@renderer/entities/project/model/inviteSlice'
import { InviteDto } from '@renderer/entities/project/types/types'
import ProfileIcon from '@renderer/features/auth/ui/ProfileIcon'
import { IconCheck, IconClose } from '@renderer/shared/assets/svgs'
import { PopoverProps } from '@renderer/shared/types/overlayProps'
import { Button } from '@renderer/shared/ui/Button/Button'
import Popover from '@renderer/shared/ui/Popover/Popover'

export default function AlarmPopover(props: PopoverProps) {
  const inviteList = useInviteList()

  const alarmLength = [...inviteList].length

  console.log(inviteList)
  return (
    <Popover {...props}>
      <div className="text-white/70 text-sm w-[300px]">
        {alarmLength < 0 && <p>새로운 알림이 없습니다.</p>}
        <InviteAlarm inviteList={inviteList} />
      </div>
    </Popover>
  )
}

function InviteAlarm({ inviteList }: { inviteList: InviteDto[] }) {
  return (
    <div>
      <span className="text-xs text-gray-400">초대</span>
      <div className="flex flex-col mt-2 gap-4">
        {inviteList.map((invite) => (
          <div className="flex flex-col" key={invite._id}>
            <div className="flex items-center">
              <div className="size-[32px] rounded-full overflow-hidden shrink-0">
                <ProfileIcon seed={invite.inviter.iconSeed ?? invite.inviter.name} />
              </div>
              <p className="ml-4 text-xs">
                <span className="font-semibold text-xs">
                  {invite.inviter.name}#{invite.inviter.tag}
                </span>
                님이 <span className="text-xs font-semibold">{invite.project.name}</span> 프로젝트에
                초대했습니다.
              </p>
            </div>
            <div className="flex justify-end text-xs gap-4">
              <Button>
                <IconClose className="size-[12px] fill-red-400" />
              </Button>
              <Button>
                <IconCheck className="size-[12px] fill-blue-400" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
