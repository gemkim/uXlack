import { cn } from '@renderer/shared/lib/utils/utils'

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isActive?: boolean
}

export function Button(props: ButtonProps) {
  const { className, children, isActive, ...attrs } = props

  return (
    <button
      className={cn(
        className,
        'flex items-center transition-colors gap-2 py-1 px-1.5 rounded-sm hover:bg-neutral-200',
        isActive && 'bg-neutral-200'
      )}
      {...attrs}
    >
      {children}
    </button>
  )
}
