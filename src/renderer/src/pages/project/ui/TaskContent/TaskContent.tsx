import { useState } from 'react'

interface TaskContentProps {}

type TaskView = 'task' | 'calendar'

function TaskContent(props: TaskContentProps) {
  const {} = props

  const [view, setView] = useState<TaskView>('task')
  const taskList = []

  return (
    <div className="flex flex-col flex-1 p-4 relative">
      {taskList.length < 1 && (
        <p className="absolute x-center y-center">새로운 일정을 등록해보세요!</p>
      )}
    </div>
  )
}

export default TaskContent
