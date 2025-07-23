import React from 'react'
import { CalendarCell } from './CalendarCell'
import { cn } from '@renderer/shared/lib/utils/utils'
import useCalendar from '@renderer/shared/hooks/useCalendar'
import { format } from 'date-fns'
import { Button } from '../Button/Button'
import { IconAngleBracket } from '@renderer/shared/assets/svgs'

const DAY_LIST = ['월', '화', '수', '목', '금', '토', '일']

export default function Calendar() {
  const { today, currentDate, daysOfMonth, prevMonth, nextMonth, setCurrentDate } = useCalendar()
  return (
    <div className='size-full flex flex-col'>
      {/* 컨트롤러 */}
      <div className='flex justify-between'>
        <span className='font-semibold'>{format(currentDate, 'yyyy년 M월')}</span>
        <div className='flex'>
          <Button onClick={prevMonth}>
            <IconAngleBracket className='rotate-90' />
          </Button>
          <Button onClick={() => setCurrentDate(today)}>오늘</Button>
          <Button onClick={nextMonth}>
            <IconAngleBracket className='rotate-270' />
          </Button>
        </div>
      </div>
      <div className='flex-1 mt-2'>
        <div className='text-xs size-full flex flex-col '>
          {/* MTWTFSS */}
          <div className='grid grid-cols-7'>
            {DAY_LIST.map((week, idx) => (
              <div key={week} className='flex justify-center'>
                <span className={cn(idx === DAY_LIST.length - 1 && 'text-red-300')}>{week}</span>
              </div>
            ))}
          </div>
          {/* days */}
          <div className='grid grid-cols-7 mt-2 flex-1'>
            {daysOfMonth.map((day, index) => (
              <CalendarCell
                today={today}
                key={`${format(day, 'yyyy-MM-dd')}-${index}`}
                day={day}
                currentDate={currentDate}
                index={index}
                totalLength={daysOfMonth.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
