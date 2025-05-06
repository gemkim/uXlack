export const cn = (...classNames: (string | false | undefined)[]) => {
  const styledClassNames = [...classNames]
    .map((className) => className && className.split(' '))
    .flat()
    .filter((className) => className)

  return styledClassNames.join(' ')
}

// 랜덤 문자열 생성 함수
export const createRandomString = (length: number = 4) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
