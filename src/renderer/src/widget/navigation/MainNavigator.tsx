import { useMyProfile } from '@renderer/entities/profile/model/slice'
import {
  useProjectActions,
  useProjectList,
  useSelectedProject
} from '@renderer/entities/project/model/slice'
import CreateNewProjectPopover from '@renderer/features/project/ui/createNewProjectPopover'
import { IconBell, IconFolder, IconHome, IconPlus, IconSearch } from '@renderer/shared/assets/svgs'
import { cn } from '@renderer/shared/lib/utils/utils'

import { Button } from '@renderer/shared/ui/Button/Button'
import Frame from '@renderer/shared/ui/Frame/Frame'

import { useInviteList } from '@renderer/entities/invite/model/slice'
import ProfileIcon from '@renderer/features/profile/ui/ProfileIcon'
import useOverlay from '@renderer/shared/hooks/useOverlay'
import AlarmPopover from '@renderer/widget/alarm/AlarmPopover'
import { useNavigate } from 'react-router'
import SettingModal from '../setting/SettingModal'

export default function MainNavigator() {
  const myProfile = useMyProfile()
  const projectList = useProjectList()
  const navigate = useNavigate()

  const { toggleModal, togglePopover } = useOverlay()
  const selectedProject = useSelectedProject()

  const { setSelectedProjectId } = useProjectActions()

  const inviteList = useInviteList()

  function handleNewProjectClick(event: React.MouseEvent<HTMLButtonElement>) {
    togglePopover(CreateNewProjectPopover, event, 'project-create-project')
  }

  function handleHomeClick() {
    setSelectedProjectId(null)
    navigate('/home')
  }

  function handleProjectClick(id: string) {
    setSelectedProjectId(id)
    navigate(`/project/${id}`)
  }

  function handleMyProfileClick() {
    toggleModal(SettingModal, 'setting-modal')
  }

  function handleAlarmClick(event: React.MouseEvent<HTMLButtonElement>) {
    togglePopover(AlarmPopover, event, 'alarm-popover')
  }

  const isSelectedProject = (id: string) => id === selectedProject?._id

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
          <Button onClick={handleAlarmClick} className="justify-between">
            <span className="flex items-center gap-2">
              {' '}
              <IconBell />
              알림
            </span>
            {inviteList.length > 0 && (
              <span className="size-[14px] rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-[9px] text-white">{inviteList.length}</span>
              </span>
            )}
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
          {/* <Button className="w-full">
            <IconQuestion />
            도움말
          </Button>
          <Button className="w-full" onClick={handleMyProfileClick}>
            <IconSetting />
            설정
          </Button> */}
          {/* <LogoutButton>
            <IconLogout />
            로그아웃
          </LogoutButton> */}
        </div>
        <div className="border-t px-4 pt-4">
          <Button className="size-full" onClick={handleMyProfileClick}>
            {myProfile && (
              <div className="flex gap-2 items-center">
                <div className="size-[32px] rounded-full bg-black overflow-hidden flex justify-center items-center">
                  <ProfileIcon seed={myProfile.iconSeed ?? myProfile.name} />
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1">
                    <span>{myProfile.name}</span>
                    <span className="text-gray-400 text-xs">#{myProfile.tag}</span>
                  </div>
                  {/* 컴포넌트 분리 필요 - 상태에따라 색상과 텍스트를 반환하는 */}
                  <span className="text-xs">온라인</span>
                </div>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
