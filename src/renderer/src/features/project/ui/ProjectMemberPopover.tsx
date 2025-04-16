import { useProfile } from '@renderer/entities/auth/model/slices'
import { useProfileList, useSelectedProject } from '@renderer/entities/project/model/slice'

import ProfileIcon from '@renderer/features/auth/ui/ProfileIcon'

import { PopoverProps } from '@renderer/shared/types/overlayProps'
import Popover from '@renderer/shared/ui/Popover/Popover'

export default function ProjectMemberPopover(props: PopoverProps) {
  const myProfile = useProfile()
  const profileList = useProfileList()
  const selectedProject = useSelectedProject()

  if (!myProfile) return
  if (!profileList) return
  if (!selectedProject) return

  const memberList = profileList.filter((profile) =>
    selectedProject.memberList.includes(profile._id)
  )

  const projectMemberList = [myProfile, ...memberList]
  return (
    <Popover {...props}>
      <div className="text-white/70 text-sm w-[150px]">
        <div className="flex flex-col">
          {projectMemberList.map((profile) => (
            <div className="flex items-center p-2" key={`${selectedProject._id}-${profile._id}`}>
              <div className="size-[32px] rounded-full overflow-hidden">
                <ProfileIcon seed={profile.iconSeed ?? profile.name} />
              </div>
              <div className="ml-2">
                <span>{profile.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Popover>
  )
}
