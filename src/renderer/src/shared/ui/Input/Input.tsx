import { cn } from '@renderer/shared/lib'

interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export function Input(props: InputProps) {
  const { className, ...attrs } = props

  return (
    <input
      className={cn(
        className,
        'bg-gray-100 p-1 outline-none text-black mt-2 border border-gray-200 rounded-sm'
      )}
      {...attrs}
    />
  )
}
