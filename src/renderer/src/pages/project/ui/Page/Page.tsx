import { useState } from 'react'
import { ProjectContent } from '../../types'
import WindowController from '@renderer/shared/ui/WindowController/WindowController'
import Frame from '@renderer/shared/ui/Frame/Frame'
import SubNavigator from '@renderer/widget/SubNavigator/ui/SubNavigator'
import { useProjectList, useSelectedProjectId } from '@renderer/entities/project/model/slice'
import ContentSection from '../ContentSection/ContentSection'

export default function ProjectPage() {
  const [content, setContent] = useState<ProjectContent>('chat')

  const projectList = useProjectList()
  const selectedProjectId = useSelectedProjectId()
  const selectedProject = projectList.find((project) => project.id === selectedProjectId)

  return (
    <div className="flex">
      <SubNavigator selectedProject={selectedProject} content={content} setContent={setContent} />
      <div className="flex-1 h-screen overflow-y-auto flex flex-col rounded-sm bg-zinc-50">
        <div className="w-full bg-white flex">
          <Frame />
          <div className="p-4 h-[50px] border-b">
            <WindowController />
          </div>
        </div>
        <ContentSection content={content} />
      </div>
    </div>
  )
}
