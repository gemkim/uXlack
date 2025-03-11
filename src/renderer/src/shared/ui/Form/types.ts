import { ReactNode } from 'react'

export interface FormProps {
  fieldList: FormField[]
  onSubmit: (data: any) => Promise<void>
  children?: ReactNode
}

export interface FormField {
  displayName: string
  registerName: string
}
