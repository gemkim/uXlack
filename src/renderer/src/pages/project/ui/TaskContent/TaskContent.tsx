import { IconCalendar, IconUnorderedList } from '@renderer/shared/assets/svgs'
import { Button } from '@renderer/shared/ui/Button/Button'

import { useState } from 'react'

type TaskView = 'task' | 'calendar'

export default function TaskContent() {
  const [view, setView] = useState<TaskView>('calendar')
  const taskList = []

  const isSelectedView = (v: TaskView) => v === view

  return (
    <div className="flex flex-col flex-1 p-4 relative">
      <div className="flex justify-between">
        <div className="flex gap-1">
          <Button isActive={isSelectedView('calendar')} onClick={() => setView('calendar')}>
            <IconCalendar />
          </Button>
          <Button isActive={isSelectedView('task')} onClick={() => setView('task')}>
            <IconUnorderedList />
          </Button>
        </div>
        <Button colorScheme="blue" className="shadow-md">
          새 일정
        </Button>
      </div>
      {taskList.length < 1 && (
        <p className="absolute x-center y-center">새로운 일정을 등록해보세요!</p>
      )}
    </div>
  )
}
