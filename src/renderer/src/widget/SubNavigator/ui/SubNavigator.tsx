import { ProjectDto } from '@renderer/entities/project'
import { ProjectContent } from '@renderer/pages/project/types'
import { IconCalendar, IconFile, IconMessage, IconUser } from '@renderer/shared/assets/svgs'
import { Button } from '@renderer/shared/ui/Button/Button'
import Frame from '@renderer/shared/ui/Frame/Frame'

interface SubNavigatorProps {
  selectedProject: ProjectDto | undefined
  content: ProjectContent
  setContent: React.Dispatch<React.SetStateAction<ProjectContent>>
}

export function SubNavigator(props: SubNavigatorProps) {
  const { selectedProject, content, setContent } = props

  const isSelectedContent = (c: ProjectContent) => c === content
  return (
    <div className="flex flex-col min-w-[220px]">
      <Frame />
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
              <Button isActive={isSelectedContent('chat')} onClick={() => setContent('chat')}>
                <IconMessage />
                메세지
              </Button>
              <Button isActive={isSelectedContent('task')} onClick={() => setContent('task')}>
                <IconCalendar />
                일정
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
