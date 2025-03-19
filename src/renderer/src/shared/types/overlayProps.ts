import { ReactNode } from 'react'

export interface OverlayProps {
  isOpen: boolean
  children?: ReactNode
  close: () => void
  unmount?: () => void
}

export interface PopoverProps extends OverlayProps {
  triggerRect: DOMRect
}
