import { ProfileDto } from '@renderer/entities/profile/types'
import { PopoverProps } from '@renderer/shared/types/overlayProps'
import Popover from '@renderer/shared/ui/Popover/Popover'
import ProfileIcon from './ProfileIcon'

interface ProfilePopoverProps extends PopoverProps {
  profile: ProfileDto
}

export default function ProfilePopover(props: ProfilePopoverProps) {
  const { profile } = props

  return (
    <Popover {...props}>
      <div className="flex items-center gap-2 ">
        <div className="size-[32px] rounded-full overflow-hidden">
          <ProfileIcon seed={profile.iconSeed ?? profile.name} />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-1 items-center">
            <div className="text-sm font-medium">{profile.name}</div>
            <div className="text-xs text-gray-500">#{profile.tag}</div>
          </div>
          {/* 임시 부서 영역 */}
          <div className="text-xs text-gray-500">UX</div>
        </div>
      </div>
    </Popover>
  )
}
