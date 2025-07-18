import { ProjectContent } from '../../types'
import MessageContent from '../MessageContent/MessageContent'
import TaskContent from '../TaskContent/TaskContent'

interface ContentSectionProps {
  content: ProjectContent
}

export default function ContentSection(props: ContentSectionProps) {
  const { content } = props

  switch (content) {
    case 'chat':
      return <MessageContent />
    case 'task':
      return <TaskContent />
    case 'resource':
      return <></>
  }
}
