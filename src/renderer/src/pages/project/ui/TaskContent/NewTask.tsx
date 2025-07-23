import { Button } from '@renderer/shared/ui/Button/Button'
import { CloseButton } from '@renderer/shared/ui/Button/CloseButton'
import PopoverWrapper, { PopoverRefType } from '@renderer/shared/ui/Popover/PopoverWrapper'
import { useRef, useState } from 'react'
import TaskForm from './TaskForm'

export function NewTask() {
  const [isOpen, setIsOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const popoverRef = useRef<PopoverRefType | null>(null)
  function handleNewTaskClick() {
    setIsOpen(true)
  }
  function onClose() {
    setIsOpen(false)
  }
  function aniClose() {
    if (!popoverRef.current) return
    popoverRef.current.refPopoverClose()
  }

  return (
    <div>
      <Button ref={btnRef} colorScheme='blue' className='shadow-md' onClick={handleNewTaskClick}>
        <span className='text-white'>새 일정</span>
      </Button>
      <PopoverWrapper ref={popoverRef} isOpen={isOpen} target={btnRef.current} onClose={onClose}>
        <div className='relative text-white/70 text-sm w-[300px]'>
          <TaskForm confirm={aniClose} />
          <CloseButton onClose={aniClose} />
        </div>
      </PopoverWrapper>
    </div>
  )
}
