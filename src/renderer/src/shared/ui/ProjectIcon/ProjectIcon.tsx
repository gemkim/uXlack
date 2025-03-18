import { cn } from '@renderer/shared/lib'

interface ProjectIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function ProjectIcon(props: ProjectIconProps) {
  const { children, className, ...attrs } = props
  return (
    <button
      className={cn(
        'size-[48px] bg-white text-black/70 opacity-50 transition-all rounded-sm duration-200',
        className
      )}
      {...attrs}
    >
      {children}
    </button>
  )
}
