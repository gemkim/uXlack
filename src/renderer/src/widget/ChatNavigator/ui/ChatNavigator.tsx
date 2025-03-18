import { useProjectList, useSelectedProjectId } from '@renderer/entities/project'
import {
  IconCalendar,
  IconFile,
  IconFolder,
  IconMessage,
  IconUser
} from '@renderer/shared/assets/svgs'
import { Button } from '@renderer/shared/ui'

export function ChatNavigator() {
  const projectList = useProjectList()
  const selectedProjectId = useSelectedProjectId()

  const selectedProject = projectList.find((project) => project.id === selectedProjectId)

  return (
    <div className="flex flex-col min-w-[220px]">
      <div
        className="w-full p-4 border-b"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        {selectedProject && (
          <div className="flex items-center gap-2">
            {/* <IconFolder /> */}
            <h1 className="text-stone-850 font-bold">
              {/* {selectedProject.name} */}
              &nbsp;
            </h1>
          </div>
        )}
      </div>
      {selectedProject && (
        <>
          <div className="border-r h-full px-4 bg-zinc-50">
            <div className="flex items-center px-1.5 py-1 mt-4 justify-between">
              <div>
                <span className="font-bold">{selectedProject.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <IconUser />
                <span className="text-sm">{selectedProject.memberList.length}</span>
              </div>
            </div>
            <div className="flex flex-col mt-4 gap-2">
              <Button>
                <IconCalendar />
                일정
              </Button>
              <Button>
                <IconMessage />
                메세지
              </Button>
              <Button>
                <IconFile />
                자료
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
