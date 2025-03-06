import { useProjectActions, useProjectList, useSelectedProjectId } from '@renderer/entities/project'
import { cn } from '@renderer/shared/lib'
import { ProjectIcon } from '@renderer/shared/ui'

export function MainNavigator() {
  const projectList = useProjectList()
  const selectedProjectId = useSelectedProjectId()
  const { setSelectedProjectId } = useProjectActions()

  function handleProjectClick(id: string) {
    setSelectedProjectId(id)
  }

  const isSelectedProject = (id: string) => id === selectedProjectId

  return (
    <div className="py-2 h-screen bg-black flex flex-col gap-2">
      {projectList.map((project) => (
        <div key={project.id} className="relative px-2">
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
  )
}
