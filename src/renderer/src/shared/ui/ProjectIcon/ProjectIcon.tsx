import { cn } from '@renderer/shared/lib'

interface ProjectIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function ProjectIcon(props: ProjectIconProps) {
  const { children, className, ...attrs } = props
  return (
    <button
      className={cn(
        'size-[50px] bg-amber-50  cursor-pointer transition-all rounded-[25px] hover:rounded-2xl hover:bg-blue-400 duration-200',
        className
      )}
      {...attrs}
    >
      {children}
    </button>
  )
}
