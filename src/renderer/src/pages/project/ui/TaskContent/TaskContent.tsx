import { IconCalendar, IconUnorderedList } from '@renderer/shared/assets/svgs'
import { Button } from '@renderer/shared/ui/Button/Button'
import Calendar from '@renderer/shared/ui/Calendar/Calendar'
import { useEffect, useState } from 'react'
import { NewTask } from './NewTask'
import { useSelectedProject } from '@renderer/entities/project/model/slice'
import { taskApi } from '@renderer/entities/task/api/taskApi'

type TaskView = 'task' | 'calendar'

export default function TaskContent() {
  const [view, setView] = useState<TaskView>('calendar')
  const isSelectedView = (v: TaskView) => v === view
  
  // const selectedProject = useSelectedProject() // project
  // console.log(selectedProject)

  // const test = async() => {
  //  리스트 가져온 후 일정 현재 프로젝트 일정 store 업데이트
  //   try { 
  //     const list =  await taskApi.getList();
  //     console.log(list);
  //   }
  //   catch(error){
  //     console.error(error);
  //   }
  // }
  // useEffect(()=>{
  //   test();
  // },[])
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
        {/* 새 일정 */}
        <NewTask />
      </div>
      <div className="flex-1 flex mt-4">{view === 'calendar' && <Calendar />}</div>
      {/* 
        프로젝트 내 일정 관련 페이지에 오는 경우 일정 조회 후 
        해당 프로젝트와 관련된 일정만 추려서 주스탄트에 업데이트 / 일정 등록 삭제도 업데이트
      */}
    </div>
  )
}
