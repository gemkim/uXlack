import { useProjectActions, useProjectList, useSelectedProjectId } from '@renderer/entities/project'
import { CreateNewProjectModal } from '@renderer/features/project/createNewProjectModal/ui/CreateNewProjectModal'
import { IconBell, IconFolder, IconHome, IconPlus, IconSearch } from '@renderer/shared/assets/svgs'

import { cn } from '@renderer/shared/lib'
import { Button, Popover } from '@renderer/shared/ui'
import { overlay } from 'overlay-kit'

export function MainNavigator() {
  const projectList = useProjectList()
  const selectedProjectId = useSelectedProjectId()
  const { setSelectedProjectId } = useProjectActions()

  function handleNewProjectClick(event: React.MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect()

    // overlay.open(({ isOpen, close, unmount }) => (
    //   <CreateNewProjectModal isOpen={isOpen} close={close} unmount={unmount} />
    // ))

    overlay.open((controller) => <Popover {...controller} triggerRect={rect}></Popover>)
  }

  function handleProjectClick(id: string) {
    setSelectedProjectId(id)
  }

  const isSelectedProject = (id: string) => id === selectedProjectId

  return (
    <div className="h-screen flex flex-col min-w-[180px] border-r z-10">
      <div
        className="w-full p-4 border-b"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        <h1 className="text-stone-850 font-bold">uXlack</h1>
      </div>
      <div className="shadow-md h-full">
        {/* 퀵메뉴 */}
        <div className="flex flex-col mt-4 px-4 gap-0.5">
          <Button>
            <IconHome />홈
          </Button>
          <Button>
            <IconSearch /> 검색
          </Button>
          <Button>
            <IconBell />
            알림
          </Button>
        </div>
        {/* 프로젝트 */}
        <div className="mt-6 px-4">
          <div className="flex justify-between items-center">
            <label className="text-xs text-stone-850/65 font-bold">프로젝트</label>
            <button onClick={handleNewProjectClick}>
              <IconPlus className="text-xs hover:fill-stone-850" />
            </button>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {projectList.map((project) => (
              <Button
                key={project.id}
                className={cn(isSelectedProject(project.id) && 'bg-neutral-200')}
                onClick={() => handleProjectClick(project.id)}
              >
                <IconFolder />
                {project.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
