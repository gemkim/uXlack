import { cn } from '@renderer/shared/lib'
import React from 'react'

interface FrameProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function Frame(props: FrameProps) {
  const { children, className, ...attrs } = props
  return (
    <div
      className={cn(
        'h-[50px] p-4 min-h-[50px] max-h-[50px] flex items-center w-full border-b',
        className
      )}
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      {...attrs}
    >
      {children}
    </div>
  )
}
