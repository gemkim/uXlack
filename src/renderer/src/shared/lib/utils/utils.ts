/**
 * 조건부 className을 손쉽게 처리하기위한 유틸 함수
 */
export const cn = (...classNames: (string | false | undefined)[]) => {
  const styledClassNames = [...classNames]
    .map((className) => className && className.split(' '))
    .flat()
    .filter((className) => className)

  return styledClassNames.join(' ')
}

/**
 * 랜덤한 문자열을 생성하는 유틸 함수
 */
export function generateString(length: number = 4) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
