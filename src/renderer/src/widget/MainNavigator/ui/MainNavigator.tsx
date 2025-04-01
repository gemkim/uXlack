import {
  useProjectActions,
  useProjectList,
  useSelectedProjectId
} from '@renderer/entities/project/model/slice'
import LogoutButton from '@renderer/features/auth/ui/LogoutButton'
import CreateNewProjectPopover from '@renderer/features/project/createNewProjectPopover/ui/createNewProjectPopover'
import {
  IconBell,
  IconFolder,
  IconHome,
  IconLogout,
  IconPlus,
  IconQuestion,
  IconSearch,
  IconSetting
} from '@renderer/shared/assets/svgs'
import { cn } from '@renderer/shared/lib/utils/utils'

import { Button } from '@renderer/shared/ui/Button/Button'
import Frame from '@renderer/shared/ui/Frame/Frame'

import { overlay } from 'overlay-kit'
import { useNavigate } from 'react-router'

export default function MainNavigator() {
  const projectList = useProjectList()
  const navigate = useNavigate()
  const selectedProjectId = useSelectedProjectId()
  const { setSelectedProjectId } = useProjectActions()

  function handleNewProjectClick(event: React.MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect()

    overlay.open((controller) => (
      <CreateNewProjectPopover {...controller} triggerRect={rect}></CreateNewProjectPopover>
    ))
  }

  function handleHomeClick() {
    setSelectedProjectId(null)
    navigate('/home')
  }

  function handleProjectClick(id: string) {
    setSelectedProjectId(id)
    navigate(`/project/${id}`)
  }

  const isSelectedProject = (id: string) => id === selectedProjectId

  return (
    <div className="h-screen flex flex-col min-w-[180px] border-r z-10">
      {/* 드래그 탭 */}
      <Frame>
        <h1 className="text-stone-850 font-bold">uXlack</h1>
      </Frame>
      {/* 네비 */}
      <div className="shadow-md h-full flex flex-col py-4">
        {/* 퀵메뉴 */}
        <div className="flex flex-col px-4 gap-0.5">
          <Button onClick={handleHomeClick}>
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
                key={project._id}
                className={cn(isSelectedProject(project._id!) && 'bg-neutral-200')}
                onClick={() => handleProjectClick(project._id!)}
              >
                <IconFolder />
                {project.name}
              </Button>
            ))}
          </div>
        </div>
        {/* 하단매뉴 */}
        <div className="mt-auto px-4 flex flex-col gap-0.5">
          <Button className="w-full">
            <IconQuestion />
            도움말
          </Button>
          <Button className="w-full">
            <IconSetting />
            설정
          </Button>
          <LogoutButton>
            <IconLogout />
            로그아웃
          </LogoutButton>
        </div>
      </div>
    </div>
  )
}
