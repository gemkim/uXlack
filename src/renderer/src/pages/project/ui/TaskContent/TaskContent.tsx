import { IconCalendar, IconUnorderedList } from '@renderer/shared/assets/svgs'
import { Button } from '@renderer/shared/ui/Button/Button'
import Calendar from '@renderer/shared/ui/Calendar/Calendar'
import { CreateTaskPopover } from '@renderer/entities/task/ui/calendar/CreateTaskPopover'
import { overlay } from 'overlay-kit'
import { useState } from 'react'

type TaskView = 'task' | 'calendar'

export default function TaskContent() {
  const [view, setView] = useState<TaskView>('calendar')
  const isSelectedView = (v: TaskView) => v === view

  function handleNewTaskClick(event: React.MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    overlay.open((controller) => <CreateTaskPopover {...controller} triggerRect={rect} />)
  }
  
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
        <Button colorScheme="blue" className="shadow-md" onClick={handleNewTaskClick}>
          새 일정
        </Button>
      </div>
      <div className="flex-1 flex mt-4">{view === 'calendar' && <Calendar />}</div>
    </div>
  )
}
