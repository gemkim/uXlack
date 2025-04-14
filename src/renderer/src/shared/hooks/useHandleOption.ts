import { useState } from 'react'

export interface Option {
  /**
   * 함수에서 쓰기위한 식별자 이름
   */
  name: string
  /**
   * 사용자에게 보여질 한글 텍스트
   */
  label: string
}

/**
 * 나열될 항목들에 대해서 isSelected 같은 처리를 보다 편리하게 처리하기 위한 hook
 */
export function useHandleOption<T extends readonly Option[]>(
  optionList: T,
  getOptionKey: (item: T[number]) => string
) {
  type OptionKey = ReturnType<typeof getOptionKey>

  const [selectedOption, setSelectedOption] = useState<T[number]>(optionList[0])

  const isSelectedOption = (option: T[number]) =>
    getOptionKey(option) === getOptionKey(selectedOption)

  const optionNames = optionList.map(getOptionKey) as OptionKey[]

  const getOptionByKey = (key: OptionKey) => optionList.find((o) => getOptionKey(o) === key)!

  const setSelectedOptionByKey = (key: OptionKey) => setSelectedOption(getOptionByKey(key))

  return {
    selectedOption,
    setSelectedOption,
    isSelectedOption,
    optionNames,
    setSelectedOptionByKey
  }
}

// export function useSelectedOption<T extends readonly Option[]>(optionList: T) {
//   type OptionName = T[number]['name']
//   const [selectedOption, setSelectedOption] = useState<T[number]>(optionList[0])

//   const isSelectedOption = (option: T[number]) => option.name === selectedOption.name
//   const getOptionByName = (name: OptionName) => optionList.find((o) => o.name === name)!
//   const setSelectedOptionByName = (name: OptionName) => setSelectedOption(getOptionByName(name))

//   return {
//     setSelectedOption,
//     isSelectedOption,
//     getOptionByName,
//     setSelectedOptionByName,
//     optionNames: optionList.map((o) => o.name) as OptionName[]
//   }
// }
