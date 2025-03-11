import { cn } from '@renderer/shared/lib'
import { OverlayProps } from './types'

export function Modal(props: OverlayProps) {
  const { isOpen, close, children, unmount } = props

  function handleBackgroundClick() {
    close()
    if (unmount) {
      setTimeout(() => {
        unmount()
      }, 1000)
    }
  }

  function stopEvent(event: React.MouseEvent) {
    event.stopPropagation()
  }

  return (
    <div
      onClick={handleBackgroundClick}
      className={cn(
        'fixed cursor-pointer w-screen h-screen transition-all bg-black/50 left-0 top-0 flex justify-center items-center',
        !isOpen && 'opacity-0 pointer-events-none'
      )}
    >
      <div onClick={stopEvent} className="p-4 bg-gray-600 rounded-sm">
        {children}
      </div>
    </div>
  )
}
