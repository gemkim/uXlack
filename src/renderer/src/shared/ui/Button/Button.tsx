import { cn } from '@renderer/shared/lib/utils/utils'

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isActive?: boolean
  colorScheme?: 'gray' | 'blue'
}

/**
 * 각 color scheme마다 hover: 반드시 필요
 *
 * 없으면 highlightColorClassName 에러 발생
 */
const buttonColorStyles = {
  gray: 'hover:bg-neutral-200',
  blue: 'bg-blue-550 hover:bg-blue-650 text-white'
}

export function Button(props: ButtonProps) {
  const { className, children, isActive, colorScheme = 'gray', ...attrs } = props

  const highlightColorClassName = buttonColorStyles[colorScheme]
    .match(/\bhover:[\w-]+\b/)![0]
    .replace(/^hover:/, '')

  return (
    <button
      className={cn(
        className,
        'flex items-center transition-colors gap-2 py-1 px-1.5 rounded-sm',
        buttonColorStyles[colorScheme],
        isActive && highlightColorClassName
      )}
      {...attrs}
    >
      {children}
    </button>
  )
}
