import { useForm } from 'react-hook-form'
import { FormProps } from './types'

export function Form(props: FormProps) {
  const { fieldList, onSubmit, children } = props
  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {fieldList.map((field) => (
        <>
          <label>{field.displayName}</label>
          <input
            {...register(field.registerName)}
            className="bg-white/80 text-black mt-1 rounded-xs"
          />
        </>
      ))}
      {children ? (
        children
      ) : (
        <button className="ml-auto mt-4 cursor-pointer" type="submit">
          확인
        </button>
      )}
    </form>
  )
}
