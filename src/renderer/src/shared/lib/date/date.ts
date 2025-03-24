import { format } from 'date-fns'

/**
 * UNIX 타임을 입력하면 '오전 00:00'과 같은 형식의 문자열 반환
 *
 * 입력한 시간의 날짜와 현재 날짜가 같으면 '오전 00:00'만 출력
 *
 * 서로 다른 날짜면 '0000.00.00 오전 00:00' 형식으로 출력
 */
export function translateTimeStamp(unixTime: number) {
  const targetDay = format(unixTime, 'y.M.d')
  const currentDay = format(new Date().getTime(), 'y.M.d')
  const isSameDay = targetDay === currentDay

  const aaa = format(unixTime, 'aaa') === 'am' ? '오전' : '오후'
  const h = format(unixTime, 'h')
  const m = format(unixTime, 'mm')
  // 오후 00:00
  const ahm = `${aaa} ${h}:${m}`

  const result = `${isSameDay ? '' : `${targetDay} `}${ahm}`

  return result
}
