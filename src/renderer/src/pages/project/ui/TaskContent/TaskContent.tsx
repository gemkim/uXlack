import { IconCalendar, IconUnorderedList } from '@renderer/shared/assets/svgs'
import { Button } from '@renderer/shared/ui/Button/Button'
import Calendar from '@renderer/shared/ui/Calendar/Calendar'
import { CreateTaskPopover } from '@renderer/entities/task/ui/calendar/CreateTaskPopover'
import { overlay } from 'overlay-kit'
import { useState } from 'react'

type TaskView = 'task' | 'calendar'

export default function TaskContent() {
  const [view, setView] = useState<TaskView>('calendar')
  const taskList = [
    {
      id:'SJ-1',
      title:'스터디 진짜 하는 날',
      date: '2025-06-20'
    },
    {
      id:'SJ-2',
      title:'스터디 진짜 진짜 하는 날',
      date: '2025-06-23'
    },
    {
      id:'SJ-3',
      title:'스터디 찐 해야하는 날',
      date: '2025-06-24'
    },{
      id:'SJ-3',
      title: '포기하면 편한 날',
      date: '2025-06-25'
    },
    {
      id:'SJ-3',
      title: '다음 스터디 뿌신다 🔥',
      date: '2025-06-26'
    }
  ]
  // └ 👏 화잍이 📨 ✍️ 브랜치 퍼가요~ 🙇‍♂️

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
