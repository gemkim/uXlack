import { useState } from 'react'

export function ChatInput() {
  const [content, setContent] = useState('')

  function handleInputOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value)
  }

  return (
    <input
      className="w-full p-2 bg-gray-400 rounded-md outline-0"
      onChange={handleInputOnChange}
      value={content}
    />
  )
}
