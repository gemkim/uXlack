import Popover from '@renderer/shared/ui/Popover/Popover'
import { PopoverProps } from '@renderer/shared/types/overlayProps'
import Form from '@renderer/shared/ui/Form/Form'
import { FormField } from '@renderer/shared/ui/Form/types'
import { createTask } from '@renderer/entities/task/model/slice'
import { CreateTaskDto } from '@renderer/entities/task/types'

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
  },
  {
    displayName: '설명',
    registerName: 'desc',
    type: 'text',
    required: true
  },
  {
    displayName: '태그 ID',
    registerName: 'tagId',
    type: 'text',
    required: true
  }
]

export const CreateTaskPopover = (props: PopoverProps) => {
  const { close } = props

  async function onSubmit(data: { name: string; date: string; desc: string; tagId: string }) {
    // console.log('등록 데이터:', data)
    try {
      const date = new Date(data.date)
      // console.log(date.toString())
      // console.log(date.toISOString())

      const taskData: CreateTaskDto = {
        name: data.name,
        startDate: date.toISOString(),
        desc: data.desc,
        tagId: data.tagId,
        projectId: '683904fd93608ebc7a645777', // 뭘로 해야할까
        createBy: '6838fa2721a4447f0c0c65fc' // 작성자 이름
      }
      await createTask(taskData)
      close()
    } catch (error) {
      console.error('일정 등록 실패:', error)
    }
  }

  return (
    <Popover {...props}>
      <div className="text-white/70 text-sm w-[300px]">
        <Form fieldList={FORM_FIELD_LIST} onSubmit={onSubmit} />
      </div>
    </Popover>
  )
}
