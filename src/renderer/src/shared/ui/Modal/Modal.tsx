import useOverlay from '@renderer/shared/hooks/useOverlay'
import { cn } from '@renderer/shared/lib/utils/utils'
import { OverlayProps } from '@renderer/shared/types/overlayProps'

export default function Modal(props: OverlayProps) {
  const { isOpen, children, overlayId } = props

  const { closeOverlay } = useOverlay()

  function handleBackgroundClick() {
    closeOverlay(overlayId)
  }

  function stopEvent(event: React.MouseEvent) {
    event.stopPropagation()
  }

  return (
    <div
      onClick={handleBackgroundClick}
      className={cn(
        'fixed  w-screen h-screen transition-all bg-black/50 left-0 top-0 flex justify-center items-center z-[100]',
        !isOpen && 'opacity-0 pointer-events-none'
      )}
    >
      <div onClick={stopEvent} className="p-4 bg-white rounded-sm">
        {children}
      </div>
    </div>
  )
}
