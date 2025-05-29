import Popover from '@renderer/shared/ui/Popover/Popover'
import { PopoverProps } from '@renderer/shared/types/overlayProps'
import Form from '@renderer/shared/ui/Form/Form'
import { FormField } from '@renderer/shared/ui/Form/types'

const FORM_FIELD_LIST: FormField[] = [
  {
    displayName: '제목',
    registerName: 'name',
    type: 'text',
    required: true
  },
  {
    displayName: '날짜',
    registerName: 'date',
    type: 'date',
    required: true
  }
]

export const CreateSchedulePopover = (props: PopoverProps) => {
  const { close } = props

  async function onSubmit(data: { name: string; date: string }) {
    console.log('일정 데이터:', data)
    close()
  }

  return (
    <Popover {...props}>
      <div className="text-white/70 text-sm w-[300px]">
        <Form fieldList={FORM_FIELD_LIST} onSubmit={onSubmit} />
      </div>
    </Popover>
  )
}
