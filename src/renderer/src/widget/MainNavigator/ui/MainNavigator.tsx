import { useProjectActions, useProjectList, useSelectedProjectId } from '@renderer/entities/project'
import { CreateNewProjectModal } from '@renderer/features/project/createNewProjectModal/ui/CreateNewProjectModal'
import { cn } from '@renderer/shared/lib'
import { ProjectIcon } from '@renderer/shared/ui'
import { overlay } from 'overlay-kit'

export function MainNavigator() {
  const projectList = useProjectList()
  const selectedProjectId = useSelectedProjectId()
  const { setSelectedProjectId } = useProjectActions()

  function handleNewProjectClick() {
    overlay.open(({ isOpen, close, unmount }) => (
      <CreateNewProjectModal isOpen={isOpen} close={close} unmount={unmount} />
    ))
  }

  function handleProjectClick(id: string) {
    setSelectedProjectId(id)
  }

  const isSelectedProject = (id: string) => id === selectedProjectId

  return (
    <div className="py-4 h-screen bg-black flex flex-col">
      <button onClick={handleNewProjectClick} className="text-white p-2 border text-sm  ">
        새 프로젝트
      </button>
      <div className="my-4 w-full h-1 border-t border-white"></div>
      <div className="flex flex-col gap-2">
        {projectList.map((project) => (
          <div key={project.id} className="relative px-2 flex justify-center">
            {isSelectedProject(project.id) && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 size-[8px] bg-blue-200"></div>
            )}
            <ProjectIcon
              className={cn(isSelectedProject(project.id) && '!rounded-2xl')}
              onClick={() => handleProjectClick(project.id)}
            >
              {project.name[0]}
            </ProjectIcon>
          </div>
        ))}
      </div>
    </div>
  )
}
