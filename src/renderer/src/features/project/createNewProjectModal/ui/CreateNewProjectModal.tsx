import { useUser } from '@renderer/entities/auth'
import { ProjectDto, createProject, useProjectActions } from '@renderer/entities/project'
import { Form, FormField, Modal, OverlayProps } from '@renderer/shared/ui'

const FORM_FIELD_LIST: FormField[] = [{ displayName: '프로젝트 이름', registerName: 'name' }]

export function CreateNewProjectModal(props: OverlayProps) {
  const { close } = props
  const user = useUser()
  const { addProject } = useProjectActions()

  async function onSubmit(data: ProjectDto) {
    if (!user) return

    const newProject: ProjectDto = {
      ...data,
      id: new Date().getTime().toString(),
      timeStamp: new Date().getTime(),
      memberList: [user.id]
    }

    await createProject(newProject)
    addProject(newProject)
    close()
  }
  return (
    <Modal {...props}>
      <div className="p-2 text-white/70 text-sm">
        <Form fieldList={FORM_FIELD_LIST} onSubmit={onSubmit} />
      </div>
    </Modal>
  )
}
