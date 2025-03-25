import SubNavigator from '@renderer/widget/SubNavigator/ui/SubNavigator'
import { useState } from 'react'
import { ProjectContent } from '../../types'
import ContentSection from '../ContentSection/ContentSection'

export default function ProjectPage() {
  const [content, setContent] = useState<ProjectContent>('chat')

  return (
    <div className="flex size-full max-h-full">
      <SubNavigator content={content} setContent={setContent} />
      <div className="flex-1 max-h-full h-full overflow-hidden flex flex-col rounded-sm bg-zinc-50">
        <ContentSection content={content} />
      </div>
    </div>
  )
}
