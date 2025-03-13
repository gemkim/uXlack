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
        'w-full p-2 mt-2 bg-sky-500 text-white font-semibold rounded-sm hover:bg-sky-600 transition-colors'
      )}
      {...attrs}
    >
      {children}
    </button>
  )
}
