import { useUser } from '@renderer/entities/auth'
import { useSocket } from '@renderer/entities/chat'
import { SOCKET_EVENT } from '@renderer/entities/chat/constants/socket-event'
import { ProjectDto, createProject, useProjectActions } from '@renderer/entities/project'
import { PopoverProps } from '@renderer/shared/types/overlayProps'
import { Form, FormField, Popover } from '@renderer/shared/ui'

const FORM_FIELD_LIST: FormField[] = [{ displayName: '프로젝트 이름', registerName: 'name' }]

export function CreateNewProjectPopover(props: PopoverProps) {
  const { close } = props
  const user = useUser()
  const { addProject } = useProjectActions()
  const socket = useSocket()

  async function onSubmit(data: ProjectDto) {
    if (!user) return
    if (!socket) return

    const idNumb = new Date().getTime()

    const newProject: ProjectDto = {
      ...data,
      id: idNumb.toString(),
      timeStamp: idNumb,
      memberList: [user.id],
      messageList: [],
      taskList: []
    }

    await createProject(newProject)
    addProject(newProject)
    socket.emit(SOCKET_EVENT.join, [idNumb.toString()])
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
