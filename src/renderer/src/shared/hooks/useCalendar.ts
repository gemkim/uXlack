import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subMonths
} from 'date-fns'
import { useState } from 'react'

export default function useCalendar() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  // 해당 월에 첫째날, 마지막 날
  const startOfCurrentMonth = startOfMonth(currentDate)
  const endOfCurrentMonth = endOfMonth(currentDate)
  // 첫째날의 첫째주, 마지막 날의 마지막 주
  const startOfFirstWeek = startOfWeek(startOfCurrentMonth, {
    weekStartsOn: 1
  })
  const endOfLastWeek = endOfWeek(endOfCurrentMonth, { weekStartsOn: 1 })
  // 지난 달을 포함해 달력에 보여지는 날짜들
  const daysOfMonth = eachDayOfInterval({
    start: startOfFirstWeek,
    end: endOfLastWeek
  })

  function nextMonth() {
    setCurrentDate((prev) => addMonths(prev, 1))
  }

  function prevMonth() {
    setCurrentDate((prev) => subMonths(prev, 1))
  }

  return { daysOfMonth, currentDate, nextMonth, prevMonth, today, setCurrentDate }
}
