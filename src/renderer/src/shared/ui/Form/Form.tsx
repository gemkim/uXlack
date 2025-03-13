import { useForm } from 'react-hook-form'
import { FormProps } from './types'
import { Input } from '../Input/Input'

export function Form(props: FormProps) {
  const { fieldList, onSubmit, children } = props
  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col gap-4">
      {fieldList.map((field, idx) => (
        <div className="flex flex-col" key={idx}>
          <label>{field.displayName}</label>
          <Input register={register(field.registerName)} type={field.type ? field.type : 'text'} />
        </div>
      ))}
      {children ? (
        children
      ) : (
        <button className="ml-auto mt-4 " type="submit">
          확인
        </button>
      )}
    </form>
  )
}
