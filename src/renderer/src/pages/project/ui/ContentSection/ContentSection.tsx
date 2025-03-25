import { ProjectContent } from '../../types'
import ChatContent from '../ChatContent/ChatContent'
import TaskContent from '../TaskContent/TaskContent'

interface ContentSectionProps {
  content: ProjectContent
}

export function ContentSection(props: ContentSectionProps) {
  const { content } = props

  switch (content) {
    case 'chat':
      return <ChatContent />
    case 'task':
      return <TaskContent />
    case 'resource':
      return <></>
  }
}
