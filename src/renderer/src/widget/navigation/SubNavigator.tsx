import { useSelectedProject } from '@renderer/entities/project/model/slice'
import { ProjectContent } from '@renderer/pages/project/types'
import { IconCalendar, IconFile, IconMessage, IconUser } from '@renderer/shared/assets/svgs'
import useOverlay from '@renderer/shared/hooks/useOverlay'
import { Button } from '@renderer/shared/ui/Button/Button'
import ProjectMemberPopover from '@renderer/widget/project/ProjectMemberPopover'

interface SubNavigatorProps {
  content: ProjectContent
  setContent: React.Dispatch<React.SetStateAction<ProjectContent>>
}

export default function SubNavigator(props: SubNavigatorProps) {
  const { content, setContent } = props

  const selectedProject = useSelectedProject()

  const { togglePopover } = useOverlay()

  const isSelectedContent = (c: ProjectContent) => c === content

  function handleProjectMemberClick(event: React.MouseEvent<HTMLButtonElement>) {
    togglePopover(ProjectMemberPopover, event, 'project-member-popover')
  }

  return (
    <div className='flex flex-col min-w-[220px] h-full'>
      {selectedProject && (
        <>
          <div className='border-r h-full px-4 bg-zinc-50'>
            <div className='flex items-center px-1.5 py-1 mt-4 justify-between'>
              <div>
                <span className='font-bold'>{selectedProject.name}</span>
              </div>
              <Button className='flex items-center gap-2' onClick={handleProjectMemberClick}>
                <IconUser />
                <span className='text-sm'>{selectedProject.memberList.length}</span>
              </Button>
            </div>
            <div className='flex flex-col mt-4 gap-2'>
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
