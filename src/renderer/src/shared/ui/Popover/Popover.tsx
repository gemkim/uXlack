import useOnOutsideClick from '@renderer/shared/hooks/useOnOutsideClick'
import { cn } from '@renderer/shared/lib'
import { OverlayProps } from '@renderer/shared/types/overlayProps'

interface PopoverProps extends OverlayProps {
  triggerRect: DOMRect
}

export function Popover(props: PopoverProps) {
  const { isOpen, close, unmount, triggerRect } = props
  const { x, y } = triggerRect

  const ref = useOnOutsideClick(() => {
    if (unmount) {
      close()
      if (unmount) {
        setTimeout(() => {
          unmount()
        }, 1000)
      }
    }
  })

  function handleContentClick(event: React.MouseEvent<HTMLDivElement>) {
    // event.stopPropagation()
    console.log('콘텐츠')
  }
  return (
    <div className="fixed left-0 top-0 w-screen h-screen z-[90] pointer-events-none">
      {/* popover */}
      <div
        ref={ref}
        className={cn(
          'size-[300px] bg-white pointer-events-auto shadow-md border',
          !isOpen && 'opacity-0 pointer-events-none'
        )}
        onClick={handleContentClick}
        style={{ marginLeft: `${x + 30}px`, marginTop: `${y}px` }}
      ></div>
    </div>
  )
}
