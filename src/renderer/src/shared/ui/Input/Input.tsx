import { cn } from '@renderer/shared/lib'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  register?: UseFormRegisterReturn<string>
}

export function Input(props: InputProps) {
  const { className, register, ...attrs } = props

  return (
    <input
      className={cn(
        className,
        'bg-gray-100 p-1 outline-none text-black mt-2 border border-gray-200 rounded-sm'
      )}
      {...register}
      {...attrs}
    />
  )
}
