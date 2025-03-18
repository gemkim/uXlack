import { cn } from '@renderer/shared/lib'

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export function Button(props: ButtonProps) {
  const { className, children, ...attrs } = props

  return (
    <button
      className={cn(
        className,
        'flex items-center transition-colors gap-2 py-1 px-1.5 rounded-sm hover:bg-neutral-200'
      )}
      {...attrs}
    >
      {children}
    </button>
  )
}
