import { SOCKET_EVENT } from '@renderer/shared/lib/socket/conetants/socket-event'
import { useSocket } from '@renderer/shared/lib/socket/model/slice'
import { useInviteActions, useInviteList } from '@renderer/entities/invite/model/slice'
import { InviteDto } from '@renderer/entities/invite/types'
import { useProfileActions, useProfileList } from '@renderer/entities/profile/model/slice'
import { respondInvite } from '@renderer/entities/project/api/projectApi'

import { useProjectActions } from '@renderer/entities/project/model/slice'
import { ProjectDto } from '@renderer/entities/project/types/types'
import ProfileIcon from '@renderer/features/profile/ui/ProfileIcon'
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
      <div className='text-white/70 text-sm w-[300px]'>
        {alarmLength < 0 && <p>새로운 알림이 없습니다.</p>}
        <InviteAlarm inviteList={inviteList} />
      </div>
    </Popover>
  )
}

function InviteAlarm({ inviteList }: { inviteList: InviteDto[] }) {
  const { setInviteList } = useInviteActions()
  const { addProjectList } = useProjectActions()
  const { addProfileList } = useProfileActions()

  const profileList = useProfileList()
  const socket = useSocket()

  async function handleInviteRespondClick(inviteId: string, isAccept: boolean) {
    if (!socket) return

    try {
      const res = await respondInvite(inviteId, isAccept)
      if (isAccept) {
        const project = res?.data.project as ProjectDto
        addProjectList([project])
        const profileIdList = profileList.map((profile) => profile._id)
        const uniqueProfileIdList = project.memberList.filter(
          (memberId) => !profileIdList.includes(memberId)
        )

        socket.emit(SOCKET_EVENT.joinRooms, [project._id], uniqueProfileIdList)
        socket.on('profile:get-multiple', (newProfileList) =>
          addProfileList([...profileList, ...newProfileList])
        )
      }
      const filteredInviteList = inviteList.filter((invite) => invite._id !== inviteId)
      setInviteList(filteredInviteList)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <span className='text-xs text-gray-400'>초대</span>
      <div className='flex flex-col mt-2 gap-4'>
        {inviteList.map((invite) => (
          <div className='flex flex-col' key={invite._id}>
            <div className='flex items-center'>
              <div className='size-[32px] rounded-full overflow-hidden shrink-0'>
                <ProfileIcon seed={invite.inviter.iconSeed ?? invite.inviter.name} />
              </div>
              <p className='ml-4 text-xs'>
                <span className='font-semibold text-xs'>
                  {invite.inviter.name}#{invite.inviter.tag}
                </span>
                님이 <span className='text-xs font-semibold'>{invite.project.name}</span> 프로젝트에
                초대했습니다.
              </p>
            </div>
            <div className='flex justify-end text-xs gap-4'>
              <Button onClick={() => handleInviteRespondClick(invite._id, false)}>
                <IconClose className='size-[12px] fill-red-400' />
              </Button>
              <Button onClick={() => handleInviteRespondClick(invite._id, true)}>
                <IconCheck className='size-[12px] fill-blue-400' />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
