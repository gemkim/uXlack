import { useProfile, useUser } from '@renderer/entities/auth/model/slices'

import { SOCKET_EVENT } from '@renderer/entities/chat/constants/socket-event'
import { useSocket } from '@renderer/entities/chat/model/slice'
import { createProject } from '@renderer/entities/project/api/projectApi'
import { useProjectActions } from '@renderer/entities/project/model/slice'

import { CreateProjectDto } from '@renderer/entities/project/types/types'

import { PopoverProps } from '@renderer/shared/types/overlayProps'
import Form from '@renderer/shared/ui/Form/Form'
import { FormField } from '@renderer/shared/ui/Form/types'
import Popover from '@renderer/shared/ui/Popover/Popover'

const FORM_FIELD_LIST: FormField[] = [{ displayName: '프로젝트 이름', registerName: 'name' }]

export default function CreateNewProjectPopover(props: PopoverProps) {
  const { close } = props
  const profile = useProfile()
  const { addProject } = useProjectActions()
  const socket = useSocket()

  async function onSubmit(data: CreateProjectDto) {
    if (!profile) return
    // if (!socket) return

    const newProject: CreateProjectDto = {
      name: data.name,
      memberList: [profile._id]
    }

    const res = await createProject(newProject)
    const createdProject = res.data.project

    addProject(createdProject)
    // socket.emit(SOCKET_EVENT.join, [idNumb.toString()])
    close()
  }
  return (
    <Popover {...props}>
      <div className="text-white/70 text-sm w-[300px]">
        <Form fieldList={FORM_FIELD_LIST} onSubmit={onSubmit} />
      </div>
    </Popover>
  )
}
