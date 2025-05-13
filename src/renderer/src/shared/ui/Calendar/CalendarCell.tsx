import { cn } from '@renderer/shared/lib/utils/utils'
import { format } from 'date-fns'

interface CalendarCellProps {
  today: Date
  currentDate: Date
  day: Date
  index: number
  totalLength: number
}

export function CalendarCell(props: CalendarCellProps) {
  const { day, currentDate, today, index, totalLength } = props

  const formatted = format(today, 'yyyy-MM-dd')
  const formattedDay = format(day, 'yyyy-MM-dd')

  const isSunday = format(day, 'iii') === 'Sun'
  const isDayOfCurrentDate = format(day, 'LLL') === format(currentDate, 'LLL')
  const isToday = formatted === formattedDay

  const isLastColumn = (index + 1) % 7 === 0
  const isLastRow = index >= totalLength - 7

  // radius 처리
  const isFirstCell = index === 0
  const isTopRight = (index + 1) % 7 === 0 && index < 7
  const isBottomLeft = index === totalLength - 7
  const isBottomRight = index === totalLength - 1

  return (
    <div
      className={cn(
        isToday && 'bg-stone-100',
        'border-l border-t flex flex-col',
        isLastColumn && 'border-r',
        isLastRow && 'border-b',
        isFirstCell && 'rounded-tl-md',
        isTopRight && 'rounded-tr-md',
        isBottomLeft && 'rounded-bl-md',
        isBottomRight && 'rounded-br-md'
      )}
    >
      <div className="flex w-full mt-1">
        <span
          className={cn(
            'ml-auto mr-2',
            isToday && 'font-semibold',
            isSunday && 'text-red-300',
            !isDayOfCurrentDate && 'opacity-50'
          )}
        >
          {format(day, 'dd')}
        </span>
      </div>
    </div>
  )
}
