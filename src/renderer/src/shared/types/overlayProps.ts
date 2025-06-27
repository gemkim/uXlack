import { ReactNode } from 'react'

export interface OverlayProps {
  isOpen: boolean
  children?: ReactNode
  close: () => void
  overlayId: string
  unmount?: () => void
}

export interface PopoverProps extends OverlayProps {
  triggerRect: DOMRect
}
